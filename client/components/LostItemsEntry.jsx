import React from 'react';

class LostItemsEntry extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>{this.props.itemName}</li>
          <li>{this.props.itemReturned + ''}</li>
        </ul>
      </div>
    );
  }
}

export default LostItemsEntry;