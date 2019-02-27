import React, { useState } from 'react';
import './InventoryItem.css';

class InventoryItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.meme.name,
            image: props.meme.image,
            quantity: props.meme.quantity,
        };
    }

    componentWillReceiveProps(newProps) {
        // this.props; // compare if desired

        this.setState({
            name: newProps.meme.name,
            image: newProps.meme.image,
            quantity: newProps.meme.quantity,
        });
    }

    render() {
        const { name, image, quantity } = this.state;
        
        return (
            <li className="inventory-item">
                <form >
                    <h3>
                        <input
                            type="text"
                            value={name}
                            onChange={e => this.setState({ name: e.target.value })} />
                    </h3>
                    <img src={this.props.meme.image} alt={this.props.meme.name} />
                    <input
                        type="text"
                        value={image}
                        onChange={e => this.setState({ image: e.target.value })} />
                    <p className="quantity">
                        Quantity:&nbsp;
                        <input
                            type="number"
                            value={quantity}
                            onChange={e => this.setState({ quantity: e.target.value })} />
                    </p>

                    <button
                        type="submit"
                        onClick={e => this.sendUpdate(e)}
                    >
                        Update
                    </button>
                    <button type="button" onClick={() => this.props.onDelete()}>Delete</button>
                </form>
            </li>
        );
    }

    sendUpdate(event) {
        event.preventDefault();

        this.props.onUpdate(this.state);
    }
}

export default InventoryItem;