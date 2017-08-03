import React from 'react';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
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
        <button onClick={this.props.setLocation.bind(this, 'messenger')}>Messenger</button>
        <p>usericon</p>
      </div>
    );
  }
}

export default MenuBar;
