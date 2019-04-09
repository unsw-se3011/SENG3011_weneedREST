import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import Summary from './summary/Summary';
import About from './about/About';
import Team from './contact/Team';
import Member from './contact/Member';
import Create from './create/Create';
import Find from './find/Find';

class Main extends Component {
  render() {
    return (
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/summary/:selectedArticles' component={Summary}/>          
          <Route path='/about' component={About}/>
          <Route exact path='/contact' component={Team}/>
          <Route path='/contact/:name' component={Member}/>
          <Route path='/create' component={Create}/>
          <Route path='/find' component={Find}/>
      </Switch>
    );
  }
}
  
export default Main;