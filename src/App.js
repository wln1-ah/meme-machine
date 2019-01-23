import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    name:"",
    image: "",
    quantity: 0,
    inventory: [],
  };

  constructor() {
    super();

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }
  
  render() {
    const inventory = this.state.inventory
      .map((meme, index) => (
        <li key={index}>
          <h2>{meme.name}</h2>
          <img src={meme.image} alt={meme.name} />
          Quantity: {meme.quantity}
        </li>
      ));

    return (
      <div className="App">
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

        <ul>
          {inventory}
        </ul>

        {/* <pre style={{textAlign: 'left'}}>{JSON.stringify(this.state.inventory, null, 4)}</pre> */}
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

    const { name, quantity, image, inventory } = this.state;

    // const name = this.state.name;
    // const image = this.state.image;
    // const quantity = this.state.quantity;

    inventory.push({
      name,
      quantity,
      image,
    });

    this.setState({
      name: '',
      image: '',
      quantity: 0,
      inventory,
    });
  }
}

export default App;
