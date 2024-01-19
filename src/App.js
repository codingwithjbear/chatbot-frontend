import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import DocumentViewer from './DocumentViewer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userMessage: '',
      isLoggedIn: false,
      onboardingDoc: null
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
        if (data.onboarding_document) {
          this.setState({ onboardingDoc: data.onboarding_document });
        } else {
          messages.unshift({ role: 'bot', content: data.response });
          this.setState({ messages });
        }
      });
  };

  closeDocumentViewer = () => {
    this.setState({ onboardingDoc: null });
  };

  render() {
    const { messages, userMessage, isLoggedIn, onboardingDoc } = this.state;

    if (!isLoggedIn) {
      return (
        <div className="CenteredContainer">
          <Login onLogin={this.handleLogin} />
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">Finish Line</header>
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
        {onboardingDoc && 
          <DocumentViewer 
            content={onboardingDoc.content} 
            onClose={this.closeDocumentViewer} 
          />
        }
      </div>
    );
  }
}


export default App;
