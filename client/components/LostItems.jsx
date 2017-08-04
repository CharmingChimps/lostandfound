import React from 'react';
import LostItemsEntry from './LostItemsEntry.jsx';

class LostItems extends React.Component {
  render() {
    console.log('lost items', this.props.items);
    return (
      <div>
        <h2>Lost Items</h2>
        {this.props.items.map(item => (
          <LostItemsEntry
            name={item.name}
            location={item.location}
            description={item.description}
          />
        ))}
      </div>
    );
  }
}

export default LostItems;
