import React, { Component } from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';
import CategoryDetails from './CategoryDetails';
import axios from "axios";

class CategoryContainer extends Component{
    constructor(props){
        super(props);
        let us = JSON.parse(localStorage.getItem("user"));
        this.state={
            categories: [],
            selectedCat: {},
            newCat: false,
            rand: this.props.rand,
            username: us ? us.username : ""
        }
        this.catDetails = this.catDetails.bind(this);
        this.newCatClick = this.newCatClick.bind(this);
        this.refresh = this.refresh.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentWillReceiveProps(){
        this.fetchData()
    }

    componentWillMount(){
       this.fetchData()
    }

    catDetails(event){
        let cat = this.state.categories.find(us => us.id === parseInt(event.target.id, 10))
        this.setState({selectedCat: cat, newCat:false})
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    newCatClick(){
        this.setState({selectedCat: {}, newCat: true})
    }

    refresh(){
        this.fetchData()
    }

    fetchData(){
        axios.get("http://localhost:8080/categories/" + this.state.username).then(resp =>{
            this.setState({categories: resp.data})
        })
    }

    render(){
        return(
            <Container style={{marginLeft: "0"}}>
                <Row>
                    <Col sm="4" style={{ marginLeft: "20px"}}>
                        <Row>
                           <h4>List of categories</h4>
                        </Row>
                        <Row>
                            <Button color="success" onClick={this.newCatClick}>Add category</Button>
                        </Row>
                        <ListGroup>
                        {this.state.categories.map( (cat) => {
                            return <ListGroupItem key={cat.id} id={cat.id} onClick={this.catDetails}>{cat.name}</ListGroupItem>
                        })}
                        </ListGroup>
                    </Col>
                    {/* //forma */}
                    <Col xs="6" sm={{ size: 6, order: 2, offset: 1 }} >
                        {(!this.isEmpty(this.state.selectedCat) || this.state.newCat) &&
                        <CategoryDetails refresh={this.refresh} category={this.state.selectedCat}/>}
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CategoryContainer;