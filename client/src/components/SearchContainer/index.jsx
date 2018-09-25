import React, { Component } from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';
import SearchForm from './SearchForm';
import AdvancedSearchForm from './AdvancedSearchForm';
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
            showSimpleSearchForm: true,
            showAdvanced: false,
            user: JSON.parse(localStorage.getItem("user")) || null
        }
        this.fetchData = this.fetchData.bind(this);
        this.bookDetails = this.bookDetails.bind(this);
        this.showSimpleSearchForm = this.showSimpleSearchForm.bind(this);
        this.showAdvancedSearchForm = this.showAdvancedSearchForm.bind(this);
        this.refresh = this.refresh.bind(this);
        this.displayResult = this.displayResult.bind(this);
    }

    componentWillMount(){
        this.fetchData()
    }

    fetchData(){
        let username = (this.state.user === null) ? "guest" : this.state.user.username;
        axios.get("http://localhost:8080/categories/"+ username).then(resp =>{
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
        this.setState({selectedBook: book, showSimpleSearchForm: false, showAdvanced: false});
    }

    showSimpleSearchForm(){
        this.setState({selectedBook: {}, showSimpleSearchForm: true, showAdvanced: false});
    }

    showAdvancedSearchForm(){
        this.setState({selectedBook: {}, showSimpleSearchForm: false, showAdvanced: true});
    }

    refresh(){
        this.fetchData();
    }

    displayResult(data, value){
        this.setState({books: data})
    }

    render(){
        return(
            <Container style={{marginLeft: "0"}}>
                <Row>
                    <Col sm="4" style={{ marginLeft: "20px"}}>
                        <Row>
                           <h4>Search options:</h4>
                        </Row>
                        <Row style={{marginBottom: "15px"}}><Button color="primary" onClick={this.showSimpleSearchForm}>Display quick search</Button></Row>
                        <Row style={{marginBottom: "15px"}}><Button color="secondary" onClick={this.showAdvancedSearchForm}>Display composite search</Button></Row>
                        <Row>
                           <h4>Search results: ({this.state.books.length})</h4>
                        </Row>
                        <ListGroup style={{marginBottom: "15px"}}>
                            {this.state.books.map( (res) => {
                                return <ListGroupItem key={res.book.id} id={res.book.id}>{res.book.title} - {res.book.author}
                                        <Button key={res.book.title} id={res.book.id} color="info" onClick={this.bookDetails} style={{margin: "5px", float:"right"}}>Details</Button>
                                        {res.highlight && <p dangerouslySetInnerHTML={{ __html: res.highlight }}/>}
                                    </ListGroupItem>
                            })}
                        </ListGroup>
                    </Col>
                    {/* //forma */}
                    <Col xs="6" sm={{ size: 6, order: 2, offset: 1 }} >
                        {this.state.showSimpleSearchForm &&
                            <SearchForm categories={this.state.categories} languages={this.state.languages}
                        reset={this.refresh} display={this.displayResult}/>}

                        {this.state.showAdvanced && 
                        <AdvancedSearchForm reset={this.refresh} display={this.displayResult} />}

                        {
                            (!this.state.showSimpleSearchForm && !this.isEmpty(this.state.selectedBook)) &&
                                <EbookDetails book={this.state.selectedBook}/>
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SearchContainer;