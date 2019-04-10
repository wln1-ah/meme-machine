import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { LOGIN } from '../../reducer';
import './Login.css';

class Login extends Component {
    state = {
        email: '',
        password: '',
    };
    
    render() {
        return (
            <div className="login-component">
                <form onSubmit={this.login}>
                    <h2>Member Log In</h2>
                    
                    <label>
                        Email:

                        <input type="email" onChange={this.handleInput} name="email" value={this.state.email} />
                    </label>
                    <label>
                        Password:

                        <input type="password" onChange={this.handleInput} name="password" value={this.state.password} />
                    </label>

                    <button type="submit">Log in</button>
                </form>

                <p className="subtext">
                    <Link to="/register">Not a member? Register!</Link>
                </p>
            </div>
        );
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    login = (event) => {
        event.preventDefault();

        this.setState({
            loading: true,
        });

        const { email, password } = this.state;

        axios.post('/auth/login', { email, password })
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

export default connect(state => ({ user: state.user }))(Login);
