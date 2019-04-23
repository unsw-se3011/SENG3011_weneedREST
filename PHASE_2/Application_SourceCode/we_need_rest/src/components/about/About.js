import React, { Component } from 'react';
import styled from 'styled-components';
import './About.css';
import 'bootstrap/dist/css/bootstrap.css';
import map from './map.png';

class About extends Component {
    render() {
      return (
        <Content>
            <div id="container">
                <img id="image" src={map} alt="Map"/>
                <h2>Our Mission: </h2><h4>to spend less time <i>searching</i> and more time <i>doing</i></h4>
                
            </div>
        </Content>
      );
    }
}

const Content = styled.div`
    margin: 0 auto;
    max-width: 800px;
`
  
export default About;