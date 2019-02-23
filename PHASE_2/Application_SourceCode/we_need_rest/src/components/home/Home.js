import React, { Component } from 'react';
import styled from 'styled-components';
import computerbg from "./computer.jpg";
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <BackgroundImage id="bg">
          <h1 class="title">Welcome to our Website</h1>
          <img id="img" src={computerbg} alt=""/>
        </BackgroundImage>
      </div>
    );
  }
}

const BackgroundImage = styled.div`
  #bg {
    position: fixed; 
    top: -50%; 
    left: -50%; 
    width: 200%; 
    height: 200%;
    z-index: -1;
  }

  #bg img {
    position: absolute; 
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    margin: auto; 
    min-width: 50%;
    min-height: 50%;
  }

  #img {
    height: 100%;
    width:100%;
    z-index: -1;
  }
`
  
export default Home;