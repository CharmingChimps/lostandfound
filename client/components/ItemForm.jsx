import React from 'react';
import axios from 'axios';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemData: {
        name: null,
        location: null,
        brand: null,
        color: null,
        condition: null,
        size: null,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const obj = {};
    obj[target.name] = target.value;
    this.setState(obj);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post(`/${this.props.type.toLowerCase()}item`, this.state.itemData)
      .then((res) => {
        this.props.setLocation('dash');
      });
  }

  render() {
    return (
      <div>

        <h2>{this.props.type} Item Form</h2>

        <form onSubmit={this.handleSubmit}>
          <p>Item Name:</p>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
          />

          <p>Location:</p>
          <input
            type="text"
            name="location"
            onChange={this.handleChange}
          />

          <p>Brand:</p>
          <input
            type="text"
            name="brand"
            onChange={this.handleChange}
          />

          <p>Color:</p>
          <input
            type="text"
            name="color"
            onChange={this.handleChange}
          />

          <p>Condition:</p>
          <input
            type="text"
            name="condition"
            onChange={this.handleChange}
          />

          <p>Size:</p>
          <input
            type="text"
            name="size"
            onChange={this.handleChange}
          />

          <button type="submit">Submit</button>
        </form>

        <button onClick={this.props.setLocation.bind(this, 'dash')}>Cancel</button>

      </div>
    );
  }
}

export default ItemForm;
