import React, { Component } from 'react';
import styled from 'styled-components';
import './Contact.css';

class Contact extends Component {
  render() {
    return (
      <Margin>
        <h1>idk that's enough for now</h1>
        <div className="card">
          <img className="card-img-top" src="https://i.redd.it/9dpvffki0ec21.jpg" alt="Card image cap"/>
          <div className="card-body">
          <p className="card-text">Bailey</p>
          </div>
        </div>
      </Margin>
    );
  }
}

const Margin = styled.div`
    margin: 0 auto;
    max-width: 800px;   
`

export default Contact;