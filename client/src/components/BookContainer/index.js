import React, { Component } from 'react';
import {Container, Row, Col, Collapse, ListGroup, ListGroupItem, Button} from 'reactstrap';
import BookDetails from './BookDetails';

class BookContainer extends Component{

    constructor(props){
        super(props);
        this.state={
            books: [{"id": 0, "title": "Book 1", "author": "Someone Importantic", "category": 0, "language": 1}, {"id": 1, "title": "Book 2", "author": "Someone", "category": 0, "language": 1}, {"id": 2, "title": "Book 2", "author": "Regula Expressionov", "category": 2, "language": 1},
            {"id": 3, "title": "Book 4", "author": "XMLovic", "category": 2, "language": 0}, {"id": 4, "title": "Book 5", "author": "Lavoranov", "category": 3, "language": 0}, {"id": 5, "title": "Book 6", "author": "Someone Importantic", "category": 3, "language": 2},
            {"id": 6, "title": "Book 7", "author": "Lavoranov", "category": 3, "language": 3}],
            categories: [{"id": 0, "name": "Cat 1"}, {"id": 1, "name": "Cat 2"}, {"id": 2, "name": "Cat 3"}, {"id": 3, "name": "Cat 4"}],
            languages: [{"id": 0, "name": "english"}, {"id": 1, "name": "serbian"},{"id": 2, "name": "french"},{"id": 3, "name": "german"}],
            selectedCatIds:[],
            selectedBook: {},
            newBook: false
        }
        this.toggleBooks = this.toggleBooks.bind(this);
        this.bookDetails = this.bookDetails.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.findCatWithId = this.findCatWithId.bind(this);
        this.newBookClick = this.newBookClick.bind(this);
    }

    componentDidMount(){
        this.setState({selectedCatIds: Array(this.state.categories.length).fill(false)})
    }

    toggleBooks(event){
        let arr = this.state.selectedCatIds;
        arr[this.findCatWithId(parseInt(event.target.id), 10)] = !arr[this.findCatWithId(parseInt(event.target.id), 10)];
        this.setState({selectedCatIds: arr});
    }

    bookDetails(event){
        let book = this.state.books.find(book => book.id === parseInt(event.target.id, 10))
        this.setState({selectedBook: book});
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
            if(book.category === categoryId){
                return <ListGroupItem key={book.id} id={book.id} onClick={this.bookDetails}>{book.title} - {book.author}</ListGroupItem>
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
        console.log(this.state)
    }

    render(){
        return (
            <Container style={{marginLeft: "0"}}>
                <Row>
                    <Col sm="4" style={{ marginLeft: "20px"}}>
                        <Row>
                           <h4>List of books, grouped by category</h4>
                           <Button color="success" onClick={this.newBookClick}>Add book</Button>
                        </Row>
                        {this.state.categories.map( (cat, i) => {
                            return( <div key={i}>
                                <Button id={cat.id} color="primary" onClick={this.toggleBooks} style={{margin: "5px"}}>{cat.name}</Button>
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
                        <BookDetails update={!this.state.newBook} book={this.state.selectedBook} categories={this.state.categories} languages={this.state.languages}/>}
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default BookContainer;