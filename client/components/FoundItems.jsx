import React from 'react';
import FoundItemsEntry from './FoundItemsEntry.jsx';

class FoundItems extends React.Component {
  render() {
    return (
      <div>
        <h2>Found Items</h2>
        {this.props.items.map(item => (
          <FoundItemsEntry
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

export default FoundItems;
