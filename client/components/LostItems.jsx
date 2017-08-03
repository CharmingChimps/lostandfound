import React from 'react';
import LostItemsEntry from './LostItemsEntry.jsx';

const fakeLostItems = [
  {
    location: 'manhattan',
    description: {
      name: 'baseball',
      brand: 'whatever',
      color: 'white',
      condition: '3',
      size: 'small',
    },
    returned: false,
  },
    {
    location: 'manhattan',
    description: {
      name: 'goldtooth',
      brand: 'whatever',
      color: 'white',
      condition: '3',
      size: 'small',
    },
    returned: false,
  },
];

class LostItems extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        <h2>Lost Items List</h2>
        {this.props.items.map(elem => (
          <LostItemsEntry
            itemName={elem.description.name}
            itemColor={elem.description.color}
            itemReturned={elem.returned}
          />
        ))
        }
      </div>
    );
  }
}

export default LostItems;
