import React, { Component } from 'react';

class AddInventory extends Component {
  state = {
    name:"",
    image: "",
    quantity: 0,
  };

  constructor() {
    super();

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }
  
  render() {
    return (
    <form onSubmit={(event) => this.handleSubmit(event)}>
        <label>
        Name:
        <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange} />
        </label>
        <label>
        Image:
        <input type="text"
                value={this.state.image}
                onChange={this.handleImageChange}  
                />
        </label>
        <label>
        Quantity:
        <input 
            type="number"
            value={this.state.quantity}
            onChange={this.handleQuantityChange}
            />
        </label>
        <button type="submit">Add</button>
    </form>
    );
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleImageChange(event){
    this.setState({
      image: event.target.value,
    })
  }

  handleQuantityChange(event){
    this.setState({
      quantity: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const { name, quantity, image } = this.state;

    this.props.onAdd({
      name,
      quantity,
      image,
    });

    this.setState({
      name: '',
      image: '',
      quantity: 0,
    });
  }
}

export default AddInventory;
