import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

class UserDetails extends Component{

    constructor(props){
        super(props);
        this.state={
            user: this.props.user,
            categories: this.props.categories,
            types: ["admin", "pretplatnik"]
        }
        this.updateState = this.updateState.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.updateType = this.updateType.bind(this);
        this.sendChanges = this.sendChanges.bind(this);
    }

    updateState(event){
        let newState = this.state.user;
        newState[event.target.name] = event.target.value;
        this.setState({user: newState})
    }

    updateCategory(event){
        let newState = this.state.user;
        newState.category = this.state.categories.find( cat => cat.id === parseInt(event.target.value, 10));
        this.setState({user: newState});
    }

    updateType(event){
        let newState =  this.state.user;
        newState.type = event.target.value;
        this.setState({user: newState});
    }

    sendChanges(){
       //axios.post("http://localhost:8080/user/" + this.state.user.username, this.state.user)
    }

    render(){
        return(
            <Form>
                <FormGroup>
                    <Label for="firstName">First name</Label>
                    <Input value={this.state.user.firstName && this.state.user.firstName} type="text" name="firstName" id="firstName" onChange={this.updateState}/>
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last name</Label>
                    <Input value={this.state.user.lastName && this.state.user.lastName} type="text" name="lastName" id="lastName" onChange={this.updateState}/>
                </FormGroup>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input value={this.state.user.username} type="text" id="username" name="username" onChange={this.updateState}/>
                </FormGroup>
                <FormGroup>
                    <Label for="userPassword">Enter new password</Label>
                    <Input type="password" name="userPassword" id="userPassword" onChange={this.updateState}/>
                </FormGroup>
                <FormGroup>
                    <Label for="userType">Type</Label>
                    <Input value={this.state.user.type} type="select" id="userType" name="userType" onChange={this.updateType}>
                        {this.state.types.map( (lang, i) => {
                            return <option key={i} value={lang}>{lang}</option>
                        })}
                    </Input>
                </FormGroup>
                {
                    this.state.user.type === "pretplatnik" && 
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <Input type="select" id="category" name="category" onChange={this.updateCategory}>
                            {this.state.categories.map(cat => {
                                return <option key={cat.id} value={cat.id}>{cat.name}</option>
                            })}
                        </Input>
                    </FormGroup>
                }
                <Button color="success" onClick={this.sendChanges}>Submit</Button>
            </Form>
        )
    }
}

export default UserDetails;
