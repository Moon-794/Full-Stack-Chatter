import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import $ from 'jquery';
import io from "socket.io-client";

const socket = io('http://localhost:3000');

function handleClick (e: React.ChangeEvent<any>)
{
    e.preventDefault();

    var message = 
    {
      username: "username",
      msg: $('input').val()
    }

    socket.emit('message', message);

    $('input').val("");
    console.log("Form Submitted");
}

function Message(props: React.PropsWithRef<any>)
{
  return (
  <div className="message">
    <p className="message-p message-header">{props.username}:</p>
    <p className="message-p message-content">{props.message}</p>
  </div>
  );
}

function App() 
{

  
  const [messages, setMessages] = useState([]);
  
  socket.on('return', (message) => 
  {
    setMessages([<Message username={message.username} message={message.msg}/>, ...messages]);
  });

  return (
      <div className="main-container">
        <div className="header">
          <h1>Full Stack Chatter</h1>
        </div>
        <div className="message-list">
          {messages}
        </div>
        <div className="input-panel">
          <form action="api/msg" onSubmit={handleClick} method="post">
            <input autoComplete="off" type="text" name="messageInput" id="messageInput" />
            <button type="submit" value="" id="submit"/>
          </form>
        </div>
      </div>
  )
}

export default App
