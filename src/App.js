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
    axios.get('http://localhost:8000/api/memes')
      .then(response => {
        this.setState({
          inventory: response.data,
        });
      });
  }
  
  render() {
    const inventory = this.state.inventory
      .map((meme, index) => (
        <InventoryItem
          meme={meme}
          key={index}
          onUpdate={update => this.updateItem(meme.id, update)}
          onDelete={() => this.deleteItem(meme.id)} />
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
    axios.post('http://localhost:8000/api/memes', item)
      .then(response => {
        this.setState({
          inventory: response.data,
        });
      });
  }

  updateItem(id, update) {
    axios.put('http://localhost:8000/api/memes/' + id, update)
      .then(response => {
        this.setState({
          inventory: response.data,
        });
      });
  }

  deleteItem(id) {
    axios.delete('http://localhost:8000/api/memes/' + id)
      .then(response => {
        this.setState({
          inventory: response.data,
        });
      });
  }
}

export default App;
