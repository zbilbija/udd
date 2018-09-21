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

    componentWillReceiveProps(newProps){
        this.setState({user: newProps.user})
    }

    logout(){
        axios.get("http://localhost:8080/logout").then(resp => {
            localStorage.removeItem("user");
            this.props.refresh();
        })
    }

    render(){
        return(
            <div>
                <Navbar color="dark" dark >
                    <NavbarBrand href="#">Ebook Repository</NavbarBrand>
                    { (this.state.user && this.state.user.type !== "guest") && <Button color="primary" onClick={this.logout}>Logout</Button>}
                </Navbar>
            </div>
        )
    }
}

export default Header;