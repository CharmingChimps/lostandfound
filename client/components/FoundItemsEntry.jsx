import React from 'react';

class FoundItemsEntry extends React.Component {
  render() {
    return (
      <div>
        <p>--ITEM--</p>
        <ul>
          <li>Name: {this.props.name}</li>
          <li>Location: {this.props.location}</li>
          <li>Description:
            <ul>
              <li>{this.props.description.color || '*color unspecified*'}</li>
              <li>{this.props.description.brand || '*brand unspecified*'}</li>
              <li>{this.props.description.size || '*size unspecified*'}</li>
              <li>{this.props.description.condition || '*condition unspecified*'}</li>
            </ul>
          </li>
          {this.props.matches.map(match =>
            (
              <li>Match:
                <ul>
                  <li>{match.name}</li>
                  <li>{match.location}</li>
                  <li>Description:
                    <ul>
                      <li>{match.description.color || '*color unspecified*'}</li>
                      <li>{match.description.brand || '*brand unspecified*'}</li>
                      <li>{match.description.size || '*size unspecified*'}</li>
                      <li>{match.description.condition || '*condition unspecified*'}</li>
                    </ul>
                  </li>
                  <li><button
                    onClick={() => {
                      console.log(this.props);
                      this.props.goToMessenger(this.props.userId, match.user_id);
                    }}
                  >Messenger</button></li>
                </ul>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

export default FoundItemsEntry;
