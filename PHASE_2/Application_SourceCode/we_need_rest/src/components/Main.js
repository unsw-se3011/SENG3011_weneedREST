import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './search/Search';
import About from './about/About';
import Contact from './contact/Contact';
import View from './view/View';
import Create from './create/Create';
import Find from './find/Find';

class Main extends Component {
  render() {
    return (
      <Switch>
          <Route exact path='/' component={Search}/>
          <Route path='/about' component={About}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/view' component={View}/>
          <Route path='/create' component={Create}/>
          <Route path='/find' component={Find}/>
      </Switch>
    );
  }
}
  
export default Main;