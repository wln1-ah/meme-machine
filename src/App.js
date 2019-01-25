import React, { Component } from 'react';
import './App.css';
import InventoryItem from './components/InventoryItem/InventoryItem'

import AddInventory from './components/AddInventory/AddInventory';

class App extends Component {
  state = {
    inventory: [],
  };
  
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
