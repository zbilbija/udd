import React, { Component } from 'react';
import './App.css';
import LoginBlock from './components/LoginBlock';
import Main from './components/Main';
import Header from './components/Header'
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props);
    let us = JSON.parse(localStorage.getItem("user"));
    this.state = {
      user:  us
    }
    this.storeUser = this.storeUser.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentWillMount(){
    if(this.state.user){
      axios.post("http://localhost:8080/login", this.state.user)
    }
  }

  storeUser(info){
    localStorage.setItem("user", JSON.stringify(info));
    this.state.user = info
    this.setState({user: info})
  }

  refresh(){
    let s = JSON.parse(localStorage.getItem("user"));
    this.setState({user: s});
  }

  render() {
    return (
      <div >
        <header>
          <Header user={this.state.user} refresh={this.refresh}/>
        </header>
        <div>
          {this.state.user && <Main />}
          {!this.state.user && <LoginBlock storeUser={this.storeUser}/>} 
        </div>
      </div>
    );
  }
}

export default App;
