import React, { Component } from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';

class Main extends Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            userType: JSON.parse(localStorage.getItem("user")).type
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }

    render(){
        return(
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                        List all books
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                        List all categories
                    </NavLink>
                </NavItem>
                {this.state.userType === "admin" && <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
                        List all users
                    </NavLink>
                </NavItem>}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                    <h4>TEMP BOOKS</h4>
                </TabPane>
                <TabPane tabId="2">
                    <h4>CATEGORY LIST</h4>
                </TabPane>
                <TabPane tabId="3">
                    <h3>USERS LIST</h3>
                </TabPane>
            </TabContent>
        </div>)
    }
}

export default Main;