import React, { Component } from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';
import UserDetails from './UserDetails';
import axios from 'axios';

class UserContainer extends Component{

    constructor(props){
        super(props);
        let us = JSON.parse(localStorage.getItem("user"));
        this.state={
            users: [],
            categories: [],
            selectedUser: {},
            newUser: false,
            rand: this.props.rand,
            stored: us ? us.username : 'guest'
        }
        this.userDetails = this.userDetails.bind(this);
        this.newUserClick = this.newUserClick.bind(this);
        this.updateData = this.updateData.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentWillReceiveProps(){
        this.updateData()
    }

    componentWillMount(){
        this.updateData();
    }

    updateData(){
        axios.get("http://localhost:8080/users").then(resp => {
            this.setState({users: resp.data})
        })
        axios.get("http://localhost:8080/categories/" + this.state.stored).then(resp =>{
            this.setState({categories: resp.data})
        })
    }

    userDetails(event){
        let user = this.state.users.find(us => us.id === parseInt(event.target.id, 10))
        this.setState({selectedUser: user});
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    newUserClick(){
        this.setState({selectedUser: {}, newUser: true});
    }

    refresh(){
        this.updateData()
    }

    render(){
        return(
            <Container style={{marginLeft: "0"}}>
                <Row>
                    <Col sm="4" style={{ marginLeft: "20px"}}>
                        <Row>
                           <h4>List of users</h4>
                        </Row>
                        <Row>
                            <Button color="success" style={{marginLeft: "15px", marginBottom: "10px"}} onClick={this.newUserClick}>Add user</Button>
                        </Row>
                        <ListGroup>
                        {this.state.users.map( (user) => {
                            return <ListGroupItem key={user.id} id={user.id} >{user.username} - {user.type}
                                <Button key={user.username} id={user.id} color="info" onClick={this.userDetails} style={{margin: "5px", float: "right"}}>Details</Button>
                            </ListGroupItem>
                        })}
                        </ListGroup>
                    </Col>
                    {/* //forma */}
                    <Col xs="6" sm={{ size: 6, order: 2, offset: 1 }} >
                        {(!this.isEmpty(this.state.selectedUser) || this.state.newUser) &&
                        <UserDetails refresh={this.refresh} user={this.state.selectedUser} categories={this.state.categories}/>}
                        
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default UserContainer;