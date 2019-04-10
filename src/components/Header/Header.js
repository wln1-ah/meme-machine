import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import axios from 'axios';
import { LOGOUT } from '../../reducer';

class Header extends Component {
    render() {
        console.log(this.props.location.pathname);

        return (
            <div className="Header">
                <h1>
                    Meme Machine
                </h1>

                { this.props.location.pathname != '/inventory' &&
                    <Link to="/inventory">Back to Inventory List</Link> }

                {/* Only show login if route isn't "/login" or "/register" */}
                { !this.props.location.pathname.startsWith('/login') && !this.props.location.pathname.startsWith('/register') &&
                    <a onClick={this.handleLoginClick} tabIndex="0">Log {this.props.user ? 'Out' : 'In'}</a>}
            </div>
        );
    }

    handleLoginClick = () => {
        if (this.props.user) {
            // If the user is logged in
            return axios.get('/auth/logout')
                .then(() => {
                    // Tell redux that you're logged out
                    this.props.dispatch({ type: LOGOUT });
                    
                    if (this.props.location.pathname != '/inventory')
                        this.props.history.push('/inventory');
                })
                // ignore it for now (should probably actually show notification)
                .catch(() => {});
        }

        // If the user isn't logged in, go to the login page
        this.props.history.push('/login');
    };
}

export default withRouter(connect(({ user }) => ({ user }))(Header));
