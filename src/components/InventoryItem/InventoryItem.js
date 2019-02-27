import React from 'react';
import { Link } from 'react-router-dom';
import './InventoryItem.css';

class InventoryItem extends React.Component {
    render() {
        const { id, name, image, quantity } = this.props.meme;
        
        return (
            <Link to={`/inventory/${id}`}>
                <li className="inventory-item">
                    <form >
                        <h3>
                            {name}
                        </h3>
                        <img src={image} alt={name} />
                        <p className="quantity">
                            Quantity: {quantity}
                        </p>
                    </form>
                </li>
            </Link>
        );
    }
}

export default InventoryItem;