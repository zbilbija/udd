import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import axios from 'axios';

class ProfileForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            validNewPass: false
        }
        this.updateState = this.updateState.bind(this);
        this.submitProfile = this.submitProfile.bind(this);
        this.checkPass = this.checkPass.bind(this);
        this.submitPass = this.submitPass.bind(this);
    }

    updateState(event){
        let newState = this.state.user;
        newState[event.target.name] = event.target.value;
        this.setState({user: newState})
    }

    submitProfile(){
        //send axios request
    }

    checkPass(event){
        if(event.target.value !== this.state.user.password){
            this.setState({validNewPass: false})
        } else {
            this.setState({validNewPass: !this.state.validNewPass})
        }
    }

    submitPass(){
        //axios request with password from this.state.user.password
    }

    render(){
        return(
            <Container style={{marginLeft: "0"}}>
                <Row>
                    <Col sm="6" style={{ marginLeft: "20px"}}>
                        <h3>Profile data</h3>
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
                            <Button color="success" onClick={this.submitProfile}>Submit</Button>
                        </Form>
                    </Col>
                    <Col sm="4" style={{marginLeft: "40px"}}>
                        <h3>Change password</h3>
                        <Form>
                            <FormGroup>
                                <Label for="password">Enter new password</Label>
                                <Input type="password" name="password" id="password" onChange={this.updateState}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password2">Re-enter new password</Label>
                                <Input type="password" name="password2" id="password2" onChange={this.checkPass} valid={this.state.validNewPass} invalid={!this.state.validNewPass}/>
                            </FormGroup>
                            <Button color="success" onClick={this.submitPass}>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ProfileForm;