import React, { Component } from 'react';
import './App.css';
import LoginBlock from './components/LoginBlock';
import Main from './components/Main';
import Header from './components/Header'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: null
    }
    this.storeUser = this.storeUser.bind(this);
  }

  storeUser(info){
    localStorage.setItem("user", JSON.stringify(info));
    this.setState({user: info});
  }

  render() {
    return (
      <div className="App">
        <header>
          <Header user={this.state.user}/>
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
