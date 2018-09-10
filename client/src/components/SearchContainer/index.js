import React, { Component } from 'react';
import {Container, Row, Col, Collapse, ListGroup, ListGroupItem, Button} from 'reactstrap';
import SearchForm from './SearchForm';
import EbookDetails from './EbookDetails';
import axios from "axios";

class SearchContainer extends Component{

    constructor(props){
        super(props);
        this.state={
            books: [],
            categories: [],
            languages: [],
            selectedBook: {},
            showSearchForm: true,
            user: JSON.parse(localStorage.getItem("user")) || null
        }
        this.fetchData = this.fetchData.bind(this);
        this.bookDetails = this.bookDetails.bind(this);
        this.showSearchForm = this.showSearchForm.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentWillMount(){
        this.fetchData()
    }

    fetchData(){
        axios.get("http://localhost:8080/categories").then(resp =>{
            this.setState({categories: resp.data})
        })
        axios.get("http://localhost:8080/languages").then(resp =>{
            this.setState({languages: resp.data})
        })
        axios.get("http://localhost:8080/searchBooks/fetchAll").then(resp =>{
            this.setState({books: resp.data})
        })
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    bookDetails(event){
        let book = this.state.books.find(book => book.id === event.target.id)
        this.setState({selectedBook: book, showSearchForm: false});
    }

    showSearchForm(){
        this.setState({selectedBook: {}, showSearchForm: true});
    }

    refresh(){
        this.fetchData();
    }

    render(){
        return(
            <Container style={{marginLeft: "0"}}>
                <Row>
                    <Col sm="4" style={{ marginLeft: "20px"}}>
                        <Row>
                           <h4>Search results:</h4>
                        </Row>
                        <Row><Button color="success" onClick={this.showSearchForm}>Display search options</Button></Row>
                        <ListGroup style={{marginBottom: "15px"}}>
                            {this.state.books.map( (book) => {
                                return <ListGroupItem key={book.id} id={book.id}>{book.title} - {book.author}
                                        <Button key={book.title} id={book.id} color="info" onClick={this.bookDetails} style={{margin: "5px"}}>Details</Button>
                                    </ListGroupItem>
                            })}
                        </ListGroup>
                    </Col>
                    {/* //forma */}
                    <Col xs="6" sm={{ size: 6, order: 2, offset: 1 }} >
                        {this.state.showSearchForm &&
                            <SearchForm categories={this.state.categories} languages={this.state.languages}
                        reset={this.refresh}/>}
                        {
                            (!this.state.showSearchForm && !this.isEmpty(this.state.selectedBook)) &&
                                <EbookDetails book={this.state.selectedBook}/>
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SearchContainer;