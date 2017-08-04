import React from 'react';
import LostItemsEntry from './LostItemsEntry.jsx';

class LostItems extends React.Component {
  render() {
    return (
      <div>
        <h2>Lost Items</h2>
        {this.props.items.map(item => (
          <LostItemsEntry
            name={item.name}
            location={item.location}
            description={item.description}
            matches={item.matches}
            goToMessenger={this.props.goToMessenger}
            userId={item.user_id}
          />
        ))}
      </div>
    );
  }
}

export default LostItems;
