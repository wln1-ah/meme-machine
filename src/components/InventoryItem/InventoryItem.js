import React, { Component } from 'react';
import './InventoryItem.css';

class InventoryItem extends Component {
    render() {
        return(
            <li className="inventory-item">
                <h3>{this.props.meme.name}</h3>
                <img src={this.props.meme.image} alt={this.props.meme.name} />
                <p className="quantity">Quantity: {this.props.meme.quantity}</p>
            </li>
        );
    }
}

export default InventoryItem;