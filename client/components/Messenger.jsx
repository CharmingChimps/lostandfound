import React from 'react';
import MessageEntry from './MessageEntry.jsx';
import axios from 'axios';


 // var fake = [{ user_id: 1, loser_id: 2, text: 'message' }, { user_id: 1, loser_id: 2, text: 'hay' }, { user_id: 1, loser_id: 2, text: 'moo' },
 // { user_id: 1, loser_id: 2, text: 'meow' }, { user_id: 1, loser_id: 2, text: 'i need water' }];


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
    this.interval = setInterval(this.handleGet.bind(this), 1000);
  }
  //CHANGE TO POST TO SERVER
  handlePost(messageObj) {
    //fake.push(messageObj);
    //console.log('fake data is ', fake);
    axios({
      method: 'POST',
      url: '/messages',
      data: messageObj,
    });
    //console.log('messgae obj handle post', messageObj);
    this.handleGet();
  }
  //CHANGE TO GET FROM SERVER
  handleGet() {
    // this.setState({ messages: [...fake] });
    axios({
      method:'GET',
      url: '/messages',
      params: {
        user_id: this.props.userId,
        to_user_id: this.props.toUserId
      }
    })
    .then((res) => {
      this.setState({messages: res.data.reverse()})
      // console.log('res.data in handleGet', res.data)
    })
  }

  handleChange(e) {
    this.setState({ message: e.target.value });
  }


  handleSubmit(e) {
    e.preventDefault();
    const message = this.state.message;
    if (message.replace(/[\s]/g, '') !== '') {
      const messageObj = {
        text: message,
        user_id: this.props.userId,
        to_user_id: this.props.toUserId
      };
      // this.setState({ messages: [...this.state.messages, message], message: '' });
      this.setState({ message: '' });
      this.handlePost(messageObj);
    }
    // this.handleGet();
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
        <button onClick={() => {
          this.props.setLocation('dash');
          clearInterval(this.interval);
        }}
        >Back</button>
      </div>
    );
  }
}

export default Messenger;
