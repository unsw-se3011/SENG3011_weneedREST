import React, { Component } from 'react';
import Header from './components/navbar/Header.js';
import Main from './components/Main.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
      </div>
    );
  }
}

export default App;