import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from "axios";

class CategoryDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            cat: this.props.category
        }
        this.updateState = this.updateState.bind(this);
        this.sendChanges = this.sendChanges.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            cat: newProps.category
        })
    }


    updateState(event){
        let newState = this.state.user;
        newState[event.target.name] = event.target.value;
        this.setState({user: newState})
    }

    sendChanges(){
       //axios.post("http://localhost:8080/category/" + this.state.user.username, this.state.user)
    }

    render(){
        return(
            <Form>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input value={this.state.cat.name && this.state.cat.name} type="text" name="name" id="name" onChange={this.updateState}/>
                </FormGroup>
                <Button color="success" onClick={this.sendChanges}>Submit</Button>
            </Form>
        )
    }
}

export default CategoryDetails;