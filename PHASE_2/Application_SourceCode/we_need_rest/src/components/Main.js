import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Contact from './contact/Contact';
import View from './view/View'
import Create from './create/Create'

class Main extends Component {
  render() {
    return (
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/view' component={View}/>
          <Route path='/create' component={Create}/>
      </Switch>
    );
  }
}
  
export default Main;