import React, { Component } from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';
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
        this.displayResult = this.displayResult.bind(this);
    }

    componentWillMount(){
        this.fetchData()
    }

    fetchData(){
        axios.get("http://localhost:8080/categories/"+ this.state.user.username).then(resp =>{
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
        let book = this.state.books.find(res => res.book.id === event.target.id)
        this.setState({selectedBook: book, showSearchForm: false});
    }

    showSearchForm(){
        this.setState({selectedBook: {}, showSearchForm: true});
    }

    refresh(){
        this.fetchData();
    }

    displayResult(data){
        this.setState({books: data})
    }

    render(){
        return(
            <Container style={{marginLeft: "0"}}>
                <Row>
                    <Col sm="4" style={{ marginLeft: "20px"}}>
                        <Row>
                           <h4>Search results:</h4>
                        </Row>
                        <Row style={{marginBottom: "15px"}}><Button color="primary" onClick={this.showSearchForm}>Display quick search</Button></Row>
                        <Row style={{marginBottom: "15px"}}><Button color="secondary" onClick={this.showSearchForm}>Display advanced search</Button></Row>
                        <ListGroup style={{marginBottom: "15px"}}>
                            {this.state.books.map( (res) => {
                                return <ListGroupItem key={res.book.id} id={res.book.id}>{res.book.title} - {res.book.author}
                                        <Button key={res.book.title} id={res.book.id} color="info" onClick={this.bookDetails} style={{margin: "5px"}}>Details</Button>
                                        {res.highlight && <p>{res.highlight}</p>}
                                    </ListGroupItem>
                            })}
                        </ListGroup>
                    </Col>
                    {/* //forma */}
                    <Col xs="6" sm={{ size: 6, order: 2, offset: 1 }} >
                        {this.state.showSearchForm &&
                            <SearchForm categories={this.state.categories} languages={this.state.languages}
                        reset={this.refresh} display={this.displayResult}/>}
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