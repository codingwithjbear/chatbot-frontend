import React from 'react';

class Login extends React.Component {
  state = {
    username: '',
    password: '' 
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onLogin();
  };

  render() {
    return (
      <div className="Login-container">
      <header className="App-header">Finsh Line</header>
        <form className="Login-form" onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
