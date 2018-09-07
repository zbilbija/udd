import React, { Component } from 'react';
import {Container, Row, Col, Collapse, ListGroup, ListGroupItem, Button,
Form, FormGroup, Label, Input} from 'reactstrap';

class SearchForm extends Component{

    constructor(props){
        super(props);
        this.state={
            book: this.props.book
        }
    }

    render(){
        return (
            <div></div>
        )
    }

}

export default SearchForm;