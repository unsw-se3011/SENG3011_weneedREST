import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Contact from './contact/Contact';

class Main extends Component {
  render() {
    return (
      <div>
          <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/about' component={About}/>
              <Route path='/contact' component={Contact}/>
          </Switch>
      </div>
    );
  }
}
  
export default Main;