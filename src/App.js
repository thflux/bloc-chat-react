import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'



// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD4geqW7VZ7e7trfIASUQaWaJA9pmGDzUE",
    authDomain: "bloc-chat-81cb7.firebaseapp.com",
    databaseURL: "https://bloc-chat-81cb7.firebaseio.com",
    projectId: "bloc-chat-81cb7",
    storageBucket: "bloc-chat-81cb7.appspot.com",
    messagingSenderId: "229890444186"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: null,
      user: null
    };
  }
  
setActiveRoom(room) {
    this.setState({activeRoom: room});
  }
  
setUser(user) {
    this.setState({user: user});
    }  
  
render() {
    return (
      <div className="App">
        <aside id="sidebar">
          <h1 className="App-title">Bloc Chat</h1>
          <RoomList firebase={firebase} activeRoom={this.state.activeRoom}setActiveRoom={this.setActiveRoom.bind(this)} user={this.state.user}/>
        </aside>
        <aside id="sidebar-bottom">
            <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user}/>
        </aside>
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user}/>
      </div>
    );
  }
}

export default App;

  