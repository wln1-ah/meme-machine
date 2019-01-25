import React, { Component } from 'react';
import './AddInventory.css';

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
        <div className="add-inventory">
            <h2>Add a meme</h2>
        
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <label>
                    <div className="label">Name:</div>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={this.handleNameChange} />
                </label>
                <label>
                    <div className="label">Image:</div>
                    <input
                        type="text"
                        value={this.state.image}
                        onChange={this.handleImageChange} />
                </label>
                <label>
                    <div className="label">Quantity:</div>
                    <input 
                        type="number"
                        value={this.state.quantity}
                        onChange={this.handleQuantityChange} />
                </label>
                <button type="submit">Add</button>
            </form>
        </div>
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
