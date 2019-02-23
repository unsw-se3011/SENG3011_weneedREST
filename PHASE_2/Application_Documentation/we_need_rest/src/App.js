import React, { Component } from 'react';
import Header from './components/navbar/Header.js';
import styled from 'styled-components';
import Main from './components/Main.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <fullHeight>
        <Header/>
        <Main/>
      </fullHeight>
    );
  }
}

const fullHeight = styled.div`
  height: 100%;
` 

export default App;