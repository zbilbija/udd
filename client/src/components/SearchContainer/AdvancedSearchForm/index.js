import React, { Component } from 'react';
import {Form, Button, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import axios from 'axios';

class AdvancedSearchForm extends Component{

    constructor(props){
        super(props);
        this.state= {
            fields: ['title', 'author', 'keywords', 'text', 'language'],
            firstField: "",
            firstValue: "",
            validFirst: false,
            secondField: "",
            secondValue: "",
            validSecond: false,
            combinations: ["AND", "OR", "NOT"],
            selectedComb: "AND"
        }
        this.submitQuery = this.submitQuery.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateCombination = this.updateCombination.bind(this);
    }

    updateState(event){
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({user: newState});
        if(event.target.name === "firstValue"){
            if(event.target.value === "")
                this.setState({validFirst: false});
            else
                this.setState({validFirst: true});
        } else if (event.target.name === "secondValue"){
            if(event.target.value === "")
                this.setState({validSecond: false});
            else
                this.setState({validSecond: true});
        }
    }

    updateCombination(event){
        this.setState({selectedComb: event.target.value});
    }

    submitQuery(){
        let obj = {
            field1: (this.state.firstField === "") ? this.state.fields[0] : this.state.firstField,
            value1: this.state.firstValue,
            field2: (this.state.secondField === "") ? this.state.fields[0] : this.state.secondField,
            value2: this.state.secondValue
        };
        axios.post("http://localhost:8080/searchBooks/queryAdvanced/" + this.state.selectedComb, obj)
        .then(resp => {
            console.log(resp.data);
            this.props.display(resp.data);
        })
    }

    render(){
        return <div>
            <h4>Composite search form</h4>
            <Form>
                <FormGroup>
                    <Label for="firstField">Select first search field</Label>
                    <Input type="select" name="firstField" id="firstField" onChange={this.updateState}>
                        {this.state.fields.map(t => {
                            return <option key={t} value={t}>{t}</option>
                        })}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="firstValue">Type value for first field</Label>
                    <Input type="text" id="firstValue" name="firstValue" onChange={this.updateState} valid={this.state.validFirst} invalid={!this.state.validFirst}/>
                    <FormFeedback tooltip>Please type what you're looking for</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="selectedComb">Select operation for composite search</Label>
                <Input type="select" name="selectedComb" id="selectedComb" onChange={this.updateCombination}>
                    {this.state.combinations.map(t => {
                        return <option key={t} value={t}>{t}</option>
                    })}
                </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="secondField">Select second search field</Label>
                    <Input type="select" name="secondField" id="secondField" onChange={this.updateState}>
                        {this.state.fields.map(t => {
                            return <option key={t} value={t}>{t}</option>
                        })}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="secondValue">Type value for second field</Label>
                    <Input type="text" id="secondValue" name="secondValue" onChange={this.updateState} valid={this.state.validSecond} invalid={!this.state.validSecond}/>
                    <FormFeedback tooltip>Please type what you're looking for</FormFeedback>
                </FormGroup>
                
                <Button color="success" onClick={this.submitQuery}>Search</Button>
                <Button color="danger" onClick={this.props.reset}>Reset results</Button>
            </Form>
        </div>
    }
}

export default AdvancedSearchForm;