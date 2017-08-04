import React from 'react';
import FoundItems from './FoundItems.jsx';
import LostItems from './LostItems.jsx';
import ItemForm from './ItemForm.jsx';
import MenuBar from './MenuBar.jsx';
import Messenger from './Messenger.jsx';
import axios from 'axios';

class DashBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: 'dash',
      data: '',
      chat: {
        user: null,
        toUser: null,
      },
    };

    this.setLocation = this.setLocation.bind(this);
    this.getDashData = this.getDashData.bind(this);
    this.goToMessenger = this.goToMessenger.bind(this);

    this.getDashData();
  }

  setLocation(location) {
    if (location === 'dash') {
      this.getDashData();
    }
    this.setState({ location });
  }

  getDashData() {
    axios.get('/dashdata')
      .then(({ data }) => {
        this.setState({ data });
      });
  }

  goToMessenger(user, toUser) {
    this.setLocation('messenger');
    this.setState({ chat: { user, toUser } });
  }

  render() {
    if (this.state.location === 'lost') {
      return (<ItemForm type="Lost" />);
    } else if (this.state.location === 'found') {
      return (<ItemForm setLocation={this.setLocation} type="Found" />);
    } else if (this.state.location === 'messenger') {
      return (<Messenger />);
    }
    return (
      <div>
        <MenuBar checkStatus={this.props.checkStatus} setLocation={this.setLocation} />
        <div>
          <FoundItems items={this.state.data ? this.state.data.found : []}
            goToMessenger={this.goToMessenger}
          />
          <LostItems items={this.state.data ? this.state.data.lost : []}
            goToMessenger={this.goToMessenger}
          />
        </div>
      </div>
    );
  }
}

export default DashBoard;
