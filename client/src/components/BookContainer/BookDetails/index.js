import React, { Component } from 'react';
import {Button, Form, FormGroup,FormText, Label, Input} from 'reactstrap';
import axios from 'axios';

class BookDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            book: this.props.book? this.props.book : {},
            categories: this.props.categories,
            languages: this.props.languages,
            update: this.props.update
        }
        this.sendFileForMetadata = this.sendFileForMetadata.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.updateLanguage = this.updateLanguage.bind(this);
        this.sendChanges = this.sendChanges.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            book: newProps.book,
            categories: newProps.categories,
            languages: newProps.languages,
            update: newProps.update
        })
    }

    sendChanges(){
        axios.post("http://localhost:8080/searchBooks/add", this.state.book)
            .then(resp => {
                 console.log(resp.data)
                 this.setState({book: resp.data});
                 this.props.refresh();
            })
    }

    sendFileForMetadata(){
        var formData = new FormData();
        let file = document.querySelector('#bookFile');
        console.log(file.files[0])
        let user = JSON.parse(localStorage.getItem("user"));
        if(file.files[0].type === "application/pdf"){
            formData.append("files", file.files[0]);
            axios.post('http://localhost:8080/searchBooks/upload/' + user.username, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(resp => {
                // response holds metadata info in book object
                console.log(resp.data)
                this.setState({book: resp.data, update: true})    
            })
        }
    }

    updateState(event){
        let newState = this.state.book;
        newState[event.target.name] = event.target.value;
        this.setState({book: newState})
    }

    updateCategory(event){
        let newState = this.state.book;
        let catId = parseInt(event.target.value, 10);
        newState.category = this.state.categories.find(c => c.id === catId);
        this.setState({book: newState});
    }

    updateLanguage(event){
        let newState =  this.state.book;
        let langId = parseInt(event.target.value, 10);
        newState.language = this.state.languages.find(l => l.id === langId);
        this.setState({book: newState});
    }

    render(){
        return(
            <div>
                <Form>
                    <FormGroup>
                        <Label for="bookFile">Upload book</Label>
                        <Input type="file" name="file" id="bookFile" onChange={this.sendFileForMetadata} accept=".pdf"/>
                        <FormText color="muted">File on server: {this.state.book.fileName.substring(this.state.book.fileName.lastIndexOf("\\")+1)}</FormText>
                    </FormGroup>
                    {this.state.update &&
                        <span>
                        <FormGroup>
                            <Label for="title">Book title</Label>
                            <Input value={this.state.book.title && this.state.book.title} type="text" name="title" id="title" onChange={this.updateState}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="author">Author</Label>
                            <Input value={this.state.book.author} type="text" id="author" name="author" onChange={this.updateState}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="keywords">Keywords</Label>
                            <Input value={this.state.book.keywords && this.state.book.keywords} type="text" name="keywords" id="keywords" onChange={this.updateState}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="language">Language</Label>
                            <Input  type="select" id="language" name="language" onChange={this.updateLanguage}>
                                {this.state.languages.map(lang => {
                                    return <option key={lang.id} value={lang.id}>{lang.name}</option>
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="publicationYear">Publication Year</Label>
                            <Input value={this.state.book.publicationYear && this.state.book.publicationYear} type="number" name="publicationYear" id="publicationYear" onChange={this.updateState}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Category</Label>
                            <Input type="select" id="category" name="category" onChange={this.updateCategory}>
                                {this.state.categories.map(cat => {
                                    return <option key={cat.id} value={cat.id}>{cat.name}</option>
                                })}
                            </Input>
                        </FormGroup>
                        </span>
                    }
                    <Button color="success" onClick={this.sendChanges}>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default BookDetails;