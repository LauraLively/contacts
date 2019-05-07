import React, { Component } from 'react';
import { Route } from "react-router-dom";
import ContactsList from '../components/ContactsList';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={ContactsList} />
      </div>
    )
  }
}

export default Routes
