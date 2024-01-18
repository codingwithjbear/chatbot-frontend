import React, { Component } from 'react';
import './App.css';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userMessage: '',
      isLoggedIn: false 
    };
  }

  // Method to handle login
  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  handleUserMessageChange = (e) => {
    this.setState({ userMessage: e.target.value });
  };

  handleSendMessage = () => {
    const { userMessage, messages } = this.state;

    if (userMessage.trim() === '') return;

    messages.unshift({ role: 'user', content: userMessage });
    this.setState({ userMessage: '' });

    fetch('http://localhost:8000/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_message: userMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        messages.unshift({ role: 'bot', content: data.response });
        this.setState({ messages });
      });
  };

  render() {
    const { messages, userMessage, isLoggedIn } = this.state;

    // If not logged in, show the Login component
    if (!isLoggedIn) {
      return (
        <div className="CenteredContainer">
          <Login onLogin={this.handleLogin} />
        </div>
      );
    }

    // If logged in, show the chat interface
    return (
      <div className="App">
        <header className="App-header">Finsh Line</header>
        <div className="Chat-container">
          <div className="Chat-history">
            {messages.map((message, index) => (
              <div key={index} className={`Message ${message.role}`}>
                {message.content}
              </div>
            ))}
          </div>
          <div className="Message-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={userMessage}
              onChange={this.handleUserMessageChange}
            />
            <button onClick={this.handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
