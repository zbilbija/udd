import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

class BookDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            book: this.props.book? this.props.book : {},
            categories: this.props.categories,
            languages: this.props.languages
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
            languages: newProps.languages
        })
    }

    sendChanges(){
        //send state thorugh axios
    }

    sendFileForMetadata(event){
        var formData = new FormData();
        let file = document.querySelector('#bookFile');
        console.log(file.files[0])
        if(file.files[0].type === "application/pdf"){
            formData.append("file", file.files[0]);
            // axios.post('urlForJavaPost', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // }).then(res => {
            //     let bookData = res.data;
            //     this.setState({book: bookData})    
            // })
            // on response -> update author, title and other fields
            // response holds metadata info in book object or smth
        }
    }

    updateState(event){
        let newState = this.state.book;
        newState[event.target.name] = event.target.value;
        this.setState({book: newState})
    }

    updateCategory(event){
        let newState = this.state.book;
        newState.category = parseInt(event.target.value, 10);
        this.setState({book: newState});
    }

    updateLanguage(event){
        let newState =  this.state.book;
        newState.language = parseInt(event.target.value, 10);
        this.setState({book: newState});
    }

    render(){
        return(
            <div>
                <Form>
                    <FormGroup>
                        <Label for="bookFile">Upload book</Label>
                        <Input type="file" name="file" id="bookFile" onChange={this.sendFileForMetadata} accept=".pdf"/>
                    </FormGroup>
                    {this.props.update &&
                        <span>
                        <FormGroup>
                            <Label for="language">Language</Label>
                            <Input value={this.state.book.language} type="select" id="language" name="language" onChange={this.updateLanguage}>
                                {this.state.languages.map(lang => {
                                    return <option key={lang.id} value={lang.id}>{lang.name}</option>
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">Book title</Label>
                            <Input value={this.state.book.title && this.state.book.title} type="text" name="title" id="title" onChange={this.updateState}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="author">Author</Label>
                            <Input value={this.state.book.author} type="text" id="author" name="author" onChange={this.updateState}/>
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