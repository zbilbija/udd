import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

class EbookDetails extends Component{
    constructor(props){
        super(props);
        let us = JSON.parse(localStorage.getItem("user"));
        this.state={
            ebook: this.props.book? this.props.book : {},
            user: (us !== null) ? us : {type: "guest"}
        }
        this.sendChanges = this.sendChanges.bind(this);
        this.resolveLink = this.resolveLink.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            ebook: newProps.book
        })
    }

    sendChanges(){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/searchBooks/download/'+this.state.ebook.book.id, true);
        xhr.responseType = 'arraybuffer';
        var that = this;
        xhr.onload = function(e) {
            if (this.status === 200) {
                var blob=new Blob([this.response], {type:"application/pdf"});
                var link=document.createElement('a');
                link.href=window.URL.createObjectURL(blob);
                link.download= that.state.ebook.book.title;
                link.click();
            }
        };
        xhr.send();
    }

    resolveLink(){
        if(this.state.user.type === "admin")
            return true
        else if (this.state.user.type === "pretplatnik"){
            if (typeof this.state.user.category === "undefined")
                return true;
            else if(this.state.ebook.book.category === this.state.user.category.name)
                return true
            else
                return false;
        } else
            return false;
    }

    render(){
        return(
            <div>
                <Form>
                    <FormGroup>
                        <Label for="title">Book title</Label>
                        <Input value={this.state.ebook.book.title && this.state.ebook.book.title} type="text" name="title" id="title" readOnly={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input value={this.state.ebook.book.author} type="text" id="author" name="author" readOnly={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="keywords">Keywords</Label>
                        <Input value={this.state.ebook.book.keywords && this.state.ebook.book.keywords} type="text" name="keywords" id="keywords" readOnly={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="language">Language</Label>
                        <Input  type="text" id="language" name="language" value={this.state.ebook.book.language && this.state.ebook.book.language} readOnly={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="publicationYear">Publication Year</Label>
                        <Input value={this.state.ebook.book.publicationYear && this.state.ebook.book.publicationYear} type="number" name="publicationYear" id="publicationYear" readOnly={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <Input type="text" id="category" name="category" value={this.state.ebook.book.category && this.state.ebook.book.category} readOnly={true}/>
                    </FormGroup>
                    {this.resolveLink() && <Button color="success" onClick={this.sendChanges}>Download book</Button>}
                </Form>
            </div>
        )
    }
}

export default EbookDetails;