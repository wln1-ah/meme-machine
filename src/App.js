import React, { Component } from 'react';
import './App.css';
import InventoryItem from './components/InventoryItem/InventoryItem';
import AddInventory from './components/AddInventory/AddInventory';

import axios from 'axios';

class App extends Component {
  state = {
    inventory: [],
  };

  componentWillMount() {
    axios.get('https://swapi.co/api/people/')
      .then(response => {
      });
  }
  
  render() {
    const inventory = this.state.inventory
      .map((meme, index) => (
        <InventoryItem meme={meme} key={index} />
      ));

    return (
      <div className="App">
        <AddInventory onAdd={item => this.addToInventory(item)} />

        <ul>
          {inventory}
        </ul>
      </div>
    );
  }

  addToInventory(item) {
    const { inventory } = this.state;
    
    inventory.push(item);

    this.setState({
      inventory,
    });
  }
}

export default App;
