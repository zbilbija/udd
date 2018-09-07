import React, { Component } from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';
import UserDetails from './UserDetails';
import axios from 'axios';

class UserContainer extends Component{

    constructor(props){
        super(props);
        this.state={
            users: [],
            categories: [],
            selectedUser: {},
            newUser: false,
            rand: this.props.rand
        }
        this.userDetails = this.userDetails.bind(this);
        this.newUserClick = this.newUserClick.bind(this);
    }

    componentWillReceiveProps(){
        axios.get("http://localhost:8080/users").then(resp => {
            this.setState({users: resp.data})
        })
        axios.get("http://localhost:8080/categories").then(resp =>{
            this.setState({categories: resp.data})
        })
    }

    componentWillMount(){
        axios.get("http://localhost:8080/users").then(resp => {
            this.setState({users: resp.data})
        })
        axios.get("http://localhost:8080/categories").then(resp =>{
            this.setState({categories: resp.data})
        })
    }

    userDetails(event){
        let user = this.state.user.find(us => us.id === parseInt(event.target.id, 10))
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

    render(){
        return(
            <Container style={{marginLeft: "0"}}>
                <Row>
                    <Col sm="4" style={{ marginLeft: "20px"}}>
                        <Row>
                           <h4>List of users</h4>
                           <div>
                            <Button color="success" onClick={this.newUserClick}>Add user</Button>
                           </div>
                        </Row>
                        <ListGroup>
                        {this.state.users.map( (user) => {
                            return <ListGroupItem key={user.id} id={user.id} onClick={this.userDetails}>{user.username} - {user.type}</ListGroupItem>
                        })}
                        </ListGroup>
                    </Col>
                    {/* //forma */}
                    <Col xs="6" sm={{ size: 6, order: 2, offset: 1 }} >
                        {(!this.isEmpty(this.state.selectedUser) || this.state.newUser) &&
                        <UserDetails user={this.state.selectedUser} categories={this.state.categories}/>}
                        
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default UserContainer;