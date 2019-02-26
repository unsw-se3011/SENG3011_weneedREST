import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Team from './Team';
import Member from './Member';

class Contact extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/contact' component={Team}/>
        <Route path='/contact/:name' component={Member}/>
      </Switch>
    );
  }
}

export default Contact;