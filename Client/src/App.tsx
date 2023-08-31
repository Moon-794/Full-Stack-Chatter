import "./App.css";

function Message()
{
  return (
  <div className="message">
    <p className="message-p message-header">Username</p>
    <p className="message-p message-content">Message Content</p>
  </div>
  );
}

function App() 
{
  return (
      <div className="main-container">
        <div className="header">
          <h1>Full Stack Chatter</h1>
        </div>
        <div className="message-list">
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <div className="input-panel">

        </div>
      </div>
  )
}


export default App
