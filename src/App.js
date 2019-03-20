import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
      rooms: [],
      newRoomName: ''
    };
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Bloc Chat</h1>
        <main>
           <RoomList firebase={firebase}  />
        </main>
      </div>
    );
  }
}

export default App;
