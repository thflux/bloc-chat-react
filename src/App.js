import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


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
    };
  }
  
  setActiveRoom(room) {
    this.setState({activeRoom: room});
  }
  
  render() {
    return (
      <div className="App">
        <aside id="sidebar">
          <h1 className="App-title">Bloc Chat</h1>
          <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)} />
        </aside>
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
      </div>
    );
  }
}

export default App;