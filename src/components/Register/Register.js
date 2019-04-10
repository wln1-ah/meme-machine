import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import './Register.css';
import { LOGIN } from '../../reducer';

class Register extends Component {
    state = {
        name: '',
        username: '',
        email: '',
        password: '',
        loading: false,
    };

    componentWillMount() {
        if (this.props.user) {
            this.props.history.push('/inventory');
        }
    }
    
    render() {
        return (
            <div className="register-component">
                <form onSubmit={this.register}>
                    <h2>Member Registration</h2>
                    
                    <label>
                        Name:

                        <input type="text" onChange={this.handleInput} name="name" value={this.state.name} />
                    </label>
                    <label>
                        Username:

                        <input type="text" onChange={this.handleInput} name="username" value={this.state.username} />
                    </label>
                    <label>
                        Email:

                        <input type="email" onChange={this.handleInput} name="email" value={this.state.email} />
                    </label>
                    <label>
                        Password:

                        <input type="password" onChange={this.handleInput} name="password" value={this.state.password} />
                    </label>

                    <button type="submit" disabled={this.state.loading}>Register</button>
                </form>

                <p className="subtext">
                    <Link to="/login">Already a member? Log in!</Link>
                </p>
            </div>
        );
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    register = (event) => {
        event.preventDefault();

        this.setState({
            loading: true,
        });

        const { name, username, email, password } = this.state;

        axios.post('/auth/register', { name, username, email, password })
            .then(response => {
                this.props.dispatch({ type: LOGIN, payload: response.data.user });
                this.props.history.push('/inventory');
            })
            .catch((err) => {
                console.warn(err);
                this.setState({
                    loading: false,
                });
            });
    };
}

export default connect(state => ({ user: state.user }))(Register);
