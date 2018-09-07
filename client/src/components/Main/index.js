import React, { Component } from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'reactstrap';
import classnames from 'classnames';
import BookContainer from '../BookContainer';
import ProfileForm from './ProfileForm';
import UserContainer from '../UserContainer';

class Main extends Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            userType: JSON.parse(localStorage.getItem("user")).type,
            rand: 0
        };
        this.refresh = this.refresh.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }

    refresh(){
        console.log("refreshed")
        this.setState({rand: this.state.rand+1})
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
                {this.state.userType !== 'guest' && <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '4' })} onClick={() => { this.toggle('4'); }}>
                        Change profile data
                    </NavLink>
                </NavItem>}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                    <BookContainer />
                </TabPane>
                <TabPane tabId="2">
                    <h4>CATEGORY LIST</h4>
                </TabPane>
                <TabPane tabId="3">
                  <UserContainer rand={this.state.rand}/>
                </TabPane>
                <TabPane tabId="4">
                    <ProfileForm user={JSON.parse(localStorage.getItem("user"))} refresh={this.refresh}/>
                </TabPane>
            </TabContent>
        </div>)
    }
}

export default Main;