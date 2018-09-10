import React, { Component } from 'react';
import {Form, Button, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

class SearchForm extends Component{

    constructor(props){
        super(props);
        this.state={
            book: {},
            searchType: ''
        }
        this.updateState = this.updateState.bind(this);
        this.submitQuery = this.submitQuery.bind(this);
        this.updateSearchType = this.updateSearchType.bind(this);
    }

    submitQuery(){
        axios.post("http://localhost:8080/searchBooks/query" + this.state.searchType, this.state.book)
        .then(resp => {
            console.log(resp.data);
        })
    }

    updateState(event){
        let newState = this.state.book;
        if(event.target.name === "publicationYear")
            newState[event.target.name] = parseInt(event.target.value, 10);
        else
            newState[event.target.name] = event.target.value;
        this.setState({book: newState})
    }

    updateSearchType(event){
        this.setState({searchType: event.target.value})
    }

    render(){
        return (
            <div>
                <h4>Search form</h4>
                <Form>
                    <FormGroup>
                        <Label for="title">Book title</Label>
                        <Input type="text" name="title" id="title" onChange={this.updateState}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input type="text" id="author" name="author" onChange={this.updateState}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="keywords">Keywords</Label>
                        <Input type="text" name="keywords" id="keywords" onChange={this.updateState}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="language">Language</Label>
                        <Input  type="text" id="language" name="language" onChange={this.updateState}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="publicationYear">Publication Year</Label>
                        <Input type="number" name="publicationYear" id="publicationYear" onChange={this.updateState} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <Input type="text" id="category" name="category" onChange={this.updateState} />
                    </FormGroup>
                    <FormGroup>
                    <Input type="select" name="searchType" id="searchType" onChange={this.updateSearchType}>
                        <option value="AND">Match all fields</option>
                        <option value="OR">Match some fields</option>
                    </Input>
                    </FormGroup>
                    <Button color="success" onChange={this.submitQuery}>Search</Button>
                    <Button color="danger" onChange={this.props.reset}>Reset results</Button>
                </Form>
            </div>
        )
    }
}

export default SearchForm;