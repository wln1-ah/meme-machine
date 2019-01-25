import React, { Component } from 'react';

class InventoryItem extends Component{
    render(
    ){
        return(
        <li>
        <h2>{this.props.meme.name}</h2>
        <img src={this.props.meme.image} alt={this.props.meme.name} />
        Quantity: {this.props.meme.quantity}
        </li>

        )
    }

}
export default InventoryItem;