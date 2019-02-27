import React, { Component } from 'react';
import axios from 'axios';

class InventoryDetail extends Component {
    state = {
        meme: {},
    };

    componentWillMount() {
        axios.get('http://localhost:8000/api/memes/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    meme: response.data,
                });
            });
    }

    render() {
        return <pre>{JSON.stringify(this.state.meme, null, 16)}</pre>;
    }
}

export default InventoryDetail;
