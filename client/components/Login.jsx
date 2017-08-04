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
        this.props.checkStatus();
      });
  }

  render() {
    if (!this.state.signUp) {
      return (
        <div className="form">
          <h1>Chimp Login</h1>
          <form className="form">
            <label className="form">
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
          <form className="form" onSubmit={this.handleSubmit.bind(this)} >
            <label className="form">
              <br />
                Bananas for passwords
              <br />
              <input
                id="inputPassword"
                type="password"
                placeholder="Enter chimp password"
                ref="password"
              />
            </label>
            <button class="buttons" type="submit">Submit</button>
          </form>
          <br />
          <button class="buttons" onClick={this.toggleSignUp}>Sign Up</button>
        </div>
      );
    }
    return (
      <SignUp checkStatus={this.props.checkStatus} toggleSignUp={this.toggleSignUp} />
    );
  }
}

export default Login;
