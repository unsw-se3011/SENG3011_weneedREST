import React, { Component } from 'react';
import styled from 'styled-components';
import './Contact.css';

function Card(props) {
  return (
    <div className="card">
      <img className="card-img-top" src={props.url} alt="Card image cap"/>
      <div className="card-body">
      <p className="card-text">{props.name}</p>
      </div>
    </div>
  )
}

class Contact extends Component {
  render() {
    return (
      <Margin>
        <h1>idk that's enough for now</h1>
        <div className="deck">
          <Card name="Bailey"   url="https://i.pinimg.com/736x/42/cd/84/42cd84625ba3ed7f52c5bb81a612486d--tarot-card-art-tarot-cards.jpg"/>
          <Card name="Nabil"    url="http://flavorwire.files.wordpress.com/2013/08/tarot__justice_by_sceithailm-d659u191.jpg"/>
          <Card name="Estella"  url="https://i.pinimg.com/736x/a4/28/c2/a428c29a8c484778140d8dea23203500--tarot-card-art-tarot-cards-art-illustration.jpg"/>
          <Card name="Jacob"    url="https://i.pinimg.com/236x/e0/6d/e3/e06de30b8d61f2826ef7532ca8265888.jpg"/>
          <Card name="Harry"    url="https://i.pinimg.com/originals/41/d5/53/41d5538ed2d66ebc13424ec8e95c56d8.jpg"/>
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