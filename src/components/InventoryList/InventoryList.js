import React, { Component } from 'react';
import axios from 'axios';

import './InventoryList.css';
import InventoryItem from '../InventoryItem/InventoryItem';

class InventoryList extends Component {
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
                    key={index} />
            ));
        
        return (
            <div className="inventory-list">{inventory}</div>
        );
    }
}

export default InventoryList;
