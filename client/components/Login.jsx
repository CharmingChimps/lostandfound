import React from 'react';
import axios from 'axios';
import SignUp from './SignUp.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAlreadyExists: false,
      signUp: false,
    };

    this.toggleSignUp = this.toggleSignUp.bind(this);
  }

  toggleSignUp(e) {
    e.preventDefault();
    this.setState({ signUp: !this.state.signUp });
  }

  handleSubmit(e) {
    e.preventDefault();

    const username = this.refs.username.value;
    const password = this.refs.password.value;
    axios.get('/login', {
      params: { username, password },
    })
      .then((res) => {
        console.log('res', res);
        this.props.checkStatus();
      });
  }

  render() {
    if (!this.state.signUp) {
      return (
        <div>
          <h1>Chimp Login</h1>
          <form>
            <label>
              <br />
                Please enter your username B
              <br />
              <input
                id="inputUsername"
                type="text"
                placeholder="Enter chimp username"
                autoFocus
                ref="username"
              />
            </label>
          </form>
          <form onSubmit={this.handleSubmit.bind(this)} >
            <label>
              <br />
                Bananas for passwords
              <br />
              <input
                id="inputPassword"
                type="text"
                placeholder="Enter chimp password"
                ref="password"
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <button onClick={this.toggleSignUp}>Sign Up</button>
        </div>
      );
    }
    return (
      <SignUp toggleSignUp={this.toggleSignUp} />
    );
  }
}

export default Login;
