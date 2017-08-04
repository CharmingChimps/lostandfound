import React from 'react';
import axios from 'axios';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    axios.get('/logout')
      .then(res => this.props.checkStatus());
  }

  render() {
    const barStyle = {
      display: 'flex',
      justifyContent: 'space-around',
    };

    return (
      <div style={barStyle}>
        <h1>LOST AND FOUND</h1>
        <button onClick={this.props.setLocation.bind(this, 'lost')}>Lost An Item</button>
        <button onClick={this.props.setLocation.bind(this, 'found')}>Found An Item</button>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default MenuBar;
