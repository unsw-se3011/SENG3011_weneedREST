import React, { Component } from 'react';
import styled from 'styled-components';
import 'bootstrap4/dist/css/bootstrap.css';

class Contact extends Component {
  render() {
    return (
      <Margin>
        <h1>idk that's enough for now</h1>
        <div class="card">
          <img class="card-img-top" src="https://i.redd.it/9dpvffki0ec21.jpg" alt="Card image cap"/>
          <div class="card-body">
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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