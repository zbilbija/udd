import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import DownloadButton from '../../DownloadButton';

class EbookDetails extends Component{
    constructor(props){
        super(props);
        let us = JSON.parse(localStorage.getItem("user"));
        this.state={
            ebook: this.props.book? this.props.book : {},
            user: (us !== null) ? us : {type: "guest"}
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            ebook: newProps.book
        })
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
                   <DownloadButton book={this.state.ebook.book}/>
                </Form>
            </div>
        )
    }
}

export default EbookDetails;