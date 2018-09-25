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
       
        let obj = {"username": this.state.username, "userPassword": this.state.password}
        axios.post("http://localhost:8080/login", obj)
            .then(resp => {
                this.props.storeUser(resp.data);
            })
    }

    render(){
        return (
            <Container>
                <Row>
                    <Col xs="6" sm="4">
                        <Form style={{textAlign: "center"}}>
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
                <Row style={{margin: "5px", textAlign: "center"}}>
                    <Col xs="6" sm="4" >
                        <Button onClick={this.props.setGuest} color="info" style={{margin: "5px"}}>Proceed as guest</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LoginBlock;