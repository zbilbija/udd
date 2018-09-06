import React, { Component } from 'react';
import { Container, Col, Row, Label, Form, FormGroup, Input, Button} from 'reactstrap';
import axios from 'axios';

class LoginBlock extends Component {

    constructor(props){
        super(props);
        this.state={
            username: "",
            password: "",
            type: "admin"
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    onInputChange(event){
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState)
    }

    submitLogin(){
        console.log(this.state)
        this.props.storeUser(this.state);
        //make axios request, if 200 -> store user obj in localStorage 
    }

    render(){
        return (
            <Container>
                <Row>
                    <Col xs="6" sm="4">
                        <Form>
                            <FormGroup>
                                <Label for="username">Enter username</Label>
                                <Input type="text" name="username" id="username" onChange={this.onInputChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Enter password</Label>
                                <Input type="password" name="password" id="passowrd" onChange={this.onInputChange}/>
                            </FormGroup>
                            <Button onClick={this.submitLogin}> Submit</Button>
                        </Form>
                    </Col>
                </Row>
                <Row style={{margin: "5px"}}>
                    <Col xs="6" sm="4">
                        <Button color="info">Proceed as guest</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LoginBlock;