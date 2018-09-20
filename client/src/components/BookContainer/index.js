import React, { Component } from 'react';
import {Container, Row, Col, Collapse, ListGroup, ListGroupItem, Button} from 'reactstrap';
import BookDetails from './BookDetails';
import axios from "axios";

class BookContainer extends Component{

    constructor(props){
        super(props);
        let us = JSON.parse(localStorage.getItem("user"));
        this.state={
            books: [],
            categories: [],
            languages: [],
            selectedCatIds:[],
            selectedBook: {},
            newBook: false,
            user: us ? us : {}
        }
        this.toggleBooks = this.toggleBooks.bind(this);
        this.bookDetails = this.bookDetails.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.findCatWithId = this.findCatWithId.bind(this);
        this.newBookClick = this.newBookClick.bind(this);
        this.refresh = this.refresh.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount(){
        this.fetchData();
    }

    componentDidMount(){
        this.setState({selectedCatIds: Array(this.state.categories.length).fill(false)})
    }

    fetchData(){
        let username = this.isEmpty(this.state.user) ? "guest" : this.state.user.username;
        axios.get("http://localhost:8080/categories/" + username).then(resp =>{
            console.log(resp.data)
            this.setState({categories: resp.data})
        })
        axios.get("http://localhost:8080/languages").then(resp =>{
            this.setState({languages: resp.data})
        })
        axios.get("http://localhost:8080/books/" + username).then(resp =>{
            this.setState({books: resp.data})
        })
        this.setState({selectedCatIds: Array(this.state.categories.length).fill(false)})
    }

    toggleBooks(event){
        let arr = this.state.selectedCatIds;
        arr[this.findCatWithId(parseInt(event.target.id, 10))] = !arr[this.findCatWithId(parseInt(event.target.id, 10))];
        this.setState({selectedCatIds: arr});
    }

    bookDetails(event){
        let book = this.state.books.find(book => book.id === parseInt(event.target.id, 10))
        this.setState({selectedBook: book, newBook: false});
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    renderListItems(categoryId){
        let arr = this.state.books.map(book => {
            if(book.category.id === categoryId){
                return <ListGroupItem key={book.id} id={book.id}>{book.title} - {book.author} 
                {!this.isEmpty(this.state.user) &&
                    <Button key={book.id} id={book.id} color="info" onClick={this.bookDetails} style={{margin: "5px"}}>Details</Button>
                }
                </ListGroupItem>
            }
            return null;
        })
        return arr;
    }

    findCatWithId(id){
        let category = this.state.categories.find(cat => cat.id === id);
        return this.state.categories.indexOf(category);
    }

    newBookClick(){
        this.setState({selectedBook: {}, newBook: true});
    }

    refresh(){
        this.fetchData();
    }

    render(){
        return (
            <Container style={{marginLeft: "0"}}>
                <Row>
                    <Col sm="4" style={{ marginLeft: "20px"}}>
                        <Row>
                           <h4>List of books, grouped by category</h4>
                           {this.state.user.type === "admin" && <Button color="success" onClick={this.newBookClick}>Add book</Button>} 
                        </Row>
                        {this.state.categories.map( (cat, i) => {
                            return( <div key={i}>
                                <Button id={cat.id} color="info" onClick={this.toggleBooks} style={{margin: "5px"}}>{cat.name}</Button>
                                <Collapse isOpen={this.state.selectedCatIds[this.findCatWithId(cat.id)]}>
                                    <ListGroup style={{marginBottom: "15px"}} >
                                        {this.renderListItems(cat.id)}
                                    </ListGroup>
                                </Collapse>
                            </div>)
                        })}
                    </Col>
                    {/* //forma */}
                    <Col xs="6" sm={{ size: 6, order: 2, offset: 1 }} >
                        {(!this.isEmpty(this.state.selectedBook) || this.state.newBook) &&
                        <BookDetails update={!this.state.newBook} book={this.state.selectedBook} categories={this.state.categories} languages={this.state.languages}
                        refresh={this.refresh}/>}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default BookContainer;