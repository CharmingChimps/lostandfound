import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import DashBoard from './DashBoard.jsx';
import Login from './Login.jsx';
import App from './App.jsx';
import ItemForm from './ItemForm.jsx';
import SignUp from './SignUp.jsx';
import Messenger from './Messenger.jsx';

class Master extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/app">App</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/itemform">ItemForm</Link></li>
            <li><Link to="/dashboard">Dash</Link></li>
            <li><Link to="/messages">Messages</Link></li>
          </ul>
          <Route path="/app" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/itemform" component={ItemForm} />
          <Route path="/dashboard" component={DashBoard} />
          <Route path="/messages" component={Messenger} />
        </div>
      </Router>
    );
  }
}

export default Master;
