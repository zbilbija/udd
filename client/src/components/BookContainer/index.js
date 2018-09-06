import React, { Component } from 'react';
import {Container, Row, Col, Collapse, ListGroup, ListGroupItem, Button,
Form, FormGroup, Label, Input} from 'reactstrap';

class BookContainer extends Component{

    constructor(props){
        super(props);
        this.state={
            books: [],
            categories: [],
            selectedCatId: 0,
            selectedBook: {}
        }
        this.toggleBooks = this.toggleBooks.bind(this);
        this.bookDetails = this.bookDetails.bidn(this);
    }

    toggleBooks(event){
        //
    }

    bookDetails(book){
        //
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render(){
        return (
            <Container>
                <Row>
                    <Col xs="6" sm="4">
                        {this.state.categories.map( (cat, i) => {
                            return( <div key={i}>
                                <Button color="primary" onClick={this.toggleBooks}>{cat.name}</Button>
                                <Collapse >
                                    <ListGroup>
                                        {this.state.books.map(book => {
                                            if(book.category === cat.id){
                                                return <ListGroupItem key={book.id} onClick={this.bookDetails(book)}>{book.title} - {book.author}</ListGroupItem>
                                            }
                                            return null;
                                        })}
                                    </ListGroup>
                                </Collapse>
                            </div>)
                        })}
                    </Col>
                    {/* //forma */}
                    <Col xs="6">
                        {!this.isEmpty(this.state.selectedBook) &&
                        <Form>
                            
                        </Form>}
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default BookContainer;