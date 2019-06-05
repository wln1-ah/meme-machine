import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import routes from './routes';
import { LOGIN } from './reducer';

class App extends Component {
  componentWillMount() {
    axios.get('/api/me')
      .then((response) => {
        console.log('foo');
        this.props.dispatch({ type: LOGIN, payload: response.data });
      })
      .catch(err => console.warn(err));
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          {routes}
        </div>
      </Router>
    );
  }
}

export default connect(state => ({ user: state.user }))(App);
