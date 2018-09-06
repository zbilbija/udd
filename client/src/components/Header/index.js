import React, { Component } from 'react';
import { Navbar, NavbarBrand, Button} from 'reactstrap';
import axios from 'axios';

class Header extends Component{

    constructor(props){
        super(props);
        this.state= {
            user: this.props.user ? this.props.user : null
        }
        this.logout = this.logout.bind(this);
    }

    logout(){
        //axios call for logout -> on 200 remove user obj from localStorage
    }

    render(){
        return(
            <div>
                <Navbar color="dark" dark >
                    <NavbarBrand href="#">Ebook Repository</NavbarBrand>
                    {this.state.user && <Button color="primary" onClick={this.logout}>Logout</Button>}
                </Navbar>
            </div>
        )
    }
}

export default Header;