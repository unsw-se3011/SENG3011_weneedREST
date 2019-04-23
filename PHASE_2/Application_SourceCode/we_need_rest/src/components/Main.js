import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import Summary from './summary/Summary';
import About from './about/About';
import Create from './create/Create';
import Report from './report/Report';
import Predict from './predict/Predict';

class Main extends Component {
  render() {
    return (
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/summary/:selectedArticles' component={Summary}/>          
          <Route path='/about' component={About}/>
          <Route path='/create' component={Create}/>
          <Route path='/report/:selectedReport' component={Report}/>
          <Route path='/predict' component={Predict}/>
      </Switch>
    );
  }
}
  
export default Main;