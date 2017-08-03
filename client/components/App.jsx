import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import DashBoard from './DashBoard.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import ItemForm from './ItemForm.jsx';
import Master from './Master.jsx';
import Messenger from './Messenger.jsx';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
    };

    this.checkStatus();

    this.checkStatus = this.checkStatus.bind(this);
  }

  checkStatus() {
    axios.get('/status')
      .then(({ data }) => {
        this.setState({ isLoggedIn: data });
      });
  }

  render() {
    return this.state.isLoggedIn ?
      (<DashBoard />) :
      (<Login checkStatus={this.checkStatus} />);
  }
}

export default App;
