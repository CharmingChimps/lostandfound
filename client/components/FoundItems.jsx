import React from 'react';
import FoundItemsEntry from './FoundItemsEntry.jsx';

class FoundItems extends React.Component {
  render() {
    console.log('found items', this.props.items);
    return (
      <div>
        <h2>Found Items</h2>
        {this.props.items.map(item => (
          <FoundItemsEntry
            name={item.name}
            location={item.location}
            description={item.description}
          />
        ))}
      </div>
    );
  }
}

export default FoundItems;
