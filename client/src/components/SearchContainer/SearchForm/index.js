import React, { Component } from 'react';
import {Form, Button, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import axios from 'axios';

class SearchForm extends Component{

    constructor(props){
        super(props);
        this.state={
            book: {},
            fields: ['title', 'author', 'keywords', 'text', 'language'],
            types: ['field', 'phrase', 'fuzzy'],
            selectedField: {field: "", value: ""},
            searchType: "",
            validValue: false
        }
        this.submitQuery = this.submitQuery.bind(this);
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.updateSearchType = this.updateSearchType.bind(this);
        this.updateSearchField = this.updateSearchField.bind(this);
    }

    submitQuery(){
        if(this.state.selectedField.field === ""){
            let obj = this.state.selectedField;
            obj.field = this.state.fields[0];
            this.setState({selectedField: obj})
        }
        if(this.state.searchType === ""){
            this.setState({searchType: this.state.types[0]});
        }
        axios.post("http://localhost:8080/searchBooks/query/" + this.state.searchType, this.state.selectedField)
        .then(resp => {
            console.log(resp.data);
            this.props.display(resp.data);
        })
    }

    updateSearchType(event){
        this.setState({searchType: event.target.value})
    }

    updateSearchField(event){
        let obj = this.state.selectedField;
        obj.field = event.target.value;
        this.setState({selectedField: obj});
    }

    updateSearchValue(event){
        let obj = this.state.selectedField;
        obj.value = event.target.value;
        if(event.target.value === ""){
            this.setState({validValue: false});
        } else {
            this.setState({validValue: true});
        }
        this.setState({selectedField: obj});
    }

    render(){
        return (
            <div>
                <h4>Simple search form</h4>
                <Form>
                    <FormGroup>
                         <Label for="field">Select search field</Label>
                        <Input type="select" name="field" id="field" onChange={this.updateSearchField}>
                            {this.state.fields.map(t => {
                                return <option value={t}>{t}</option>
                            })}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="value">Type value for search</Label>
                        <Input type="text" id="value" name="value" onChange={this.updateSearchValue} valid={this.state.validValue} invalid={!this.state.validValue}/>
                        <FormFeedback tooltip>Please type what you're looking for</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                    <Input type="select" name="searchType" id="searchType" onChange={this.updateSearchType}>
                        {this.state.types.map(t => {
                            return <option value={t}>{t}</option>
                        })}
                    </Input>
                    </FormGroup>
                    <Button color="success" onClick={this.submitQuery}>Search</Button>
                    <Button color="danger" onClick={this.props.reset}>Reset results</Button>
                </Form>
            </div>
        )
    }
}

export default SearchForm;