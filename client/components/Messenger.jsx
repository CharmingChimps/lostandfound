import React from 'react';
import MessageEntry from './MessageEntry.jsx';
import axios from 'axios';


var fake = [{ user_id: 1, loser_id: 2, text: 'message' }, { user_id: 1, loser_id: 2, text: 'hay' }, { user_id: 1, loser_id: 2, text: 'moo' },
  { user_id: 1, loser_id: 2, text: 'meow' }, { user_id: 1, loser_id: 2, text: 'i need water' }];


class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleGet = this.handleGet.bind(this);
  }

  componentDidMount() {
    this.handleGet();
  }
  //CHANGE TO POST TO SERVER
  handlePost(messageObj) {
    fake.push(messageObj);
    console.log('fake data is ', fake);
    // axios({
    //   method: 'POST',
    //   url: '/messages',
    //   data: messageObj,
    // });
    console.log('messgae obj here', messageObj);
    this.handleGet();
  }
  //CHANGE TO GET FROM SERVER
  handleGet() {
    this.setState({ messages: [...fake] });
    // axios({
    //   method:'GET',
    //   url: '/messages'
    // })
    // .then(function(res) {

    // })
  }

  handleChange(e) {
    this.setState({ message: e.target.value });
  }


  handleSubmit(e) {
    e.preventDefault();
    const message = this.state.message;
    const messageObj = {
      user_id: 1,
      loser_id: 2,
      text: message,
    };
    this.setState({ messages: [...this.state.messages, message], message: '' });
    this.handlePost(messageObj);
    this.handleGet();
  }

  render() {
    return (
      <div>
        <h1>Chimp Chat</h1>
        <div>
          { this.state.messages.map(function (messageObj, key) { return <MessageEntry message={messageObj.text} key={key} /> }) }
        </div>
        <form onSubmit={(event) => {
          this.handleSubmit(event);
        }}>
          <label>
            <br />
              Please enter a message:
            <br />
            <input type="text" placeholder="Enter a message B" value={this.state.message} onChange={(event) => {
              this.handleChange(event);
            }} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Messenger;
