import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from "axios";

class CategoryDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            cat: this.props.category ? this.props.category : {}
        }
        this.updateState = this.updateState.bind(this);
        this.sendChanges = this.sendChanges.bind(this);
    }

    componentWillReceiveProps(newProps){
        if(this.isEmpty(newProps.category)){
            this.setState({
                cat: {}
            })
        }else{
            this.setState({
                cat: newProps.category
            })
        }
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    updateState(event){
        let newState = this.state.cat;
        newState[event.target.name] = event.target.value;
        this.setState({cat: newState})
    }

    sendChanges(){
       axios.post("http://localhost:8080/addCategory", this.state.cat).then(resp => {
           this.props.refresh()
       })
    }

    render(){
        return(
            <Form>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input value={this.state.cat.name ? this.state.cat.name : ''} type="text" name="name" id="name" onChange={this.updateState}/>
                </FormGroup>
                <Button color="success" onClick={this.sendChanges}>Submit</Button>
            </Form>
        )
    }
}

export default CategoryDetails;