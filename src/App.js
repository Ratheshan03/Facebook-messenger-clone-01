import React, { useEffect, useState } from 'react';
import { FormControl, Input } from '@material-ui/core';
import './App.css';
import Message from './Message.js';
import db from './firebase.js';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import {IconButton} from '@material-ui/core';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessage] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    //runs when the app component loads
    //everytime there is change in the input snapshots gets the change and saves it to the var-snapshot
    //then from the snapshots we are mapping through the documents and getting the data(username,message)
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessage(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [] )

  useEffect(() => {
    // run code here..
    // if its blank inside [], this code runs ONCE when the app component loads
    // const username = prompt('Please enter your name');
    setUsername(prompt('Please enter your name: '));
  }, [] ) // condition

  const sendMessage = (event) => {
    event.preventDefault(); // desables the refreshing on submitting the button

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="Messenger-Logo"/>
      <h1 className="app__title">Messenger</h1>
      <h4 className="app__subTitile">From Facebook and Ratheshan Sathiyamoorthy</h4>
      <h2>Welcome {username}!</h2>
      <h5>Lets get started</h5>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
            <SendIcon/>
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>
     
    </div>
  );
}

export default App;
