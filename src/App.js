import React, { Component } from 'react';
import './App.css';
import InventoryItem from './components/InventoryItem/InventoryItem';
import AddInventory from './components/AddInventory/AddInventory';

import axios from 'axios';

class App extends Component {
  state = {
    inventory: [],
    people: [],
  };

  componentWillMount() {
    axios.get('https://swapi.co/api/people/')
      .then(response => {
        this.setState({
          people: response.data.results,
        });
      });
  }
  
  render() {
    const inventory = this.state.inventory
      .map((meme, index) => (
        <InventoryItem meme={meme} key={index} />
      ));

    const people = this.state.people
        .map((person, i) => {
          return (
            <tr key={i}>
              <td>{ person.name }</td>
              <td>{ person.height }</td>
              <td>{ person.hair_color }</td>
              <td>{ person.birth_year }</td>
            </tr>
          );
        })

    return (
      <div className="App">
        <AddInventory onAdd={item => this.addToInventory(item)} />

        <ul>
          {inventory}
        </ul>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Hair Color</th>
              <th>Birth Year</th>
            </tr>
          </thead>
          <tbody>
            { people }
          </tbody>
        </table>
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
