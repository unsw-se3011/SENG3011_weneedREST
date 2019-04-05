import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './Contact.css';

function Card(props) {
    return (
        <Link to={`/contact/${props.name}`}>
            <div className="card">
                <img className="card-img-top" src={props.url} alt="Team member card"/>
                <div className="card-body">
                <p className="card-text">{props.name}</p>
                </div>
            </div>
        </Link>
    )
  }

class Team extends Component {
    render() {
        return (
            <Margin>
                <h1>Meet the team</h1>
                <div className="deck">
                    <Card name="Bailey"   url="https://i.pinimg.com/736x/42/cd/84/42cd84625ba3ed7f52c5bb81a612486d--tarot-card-art-tarot-cards.jpg"/>
                    <Card name="Nabil"    url="http://66.media.tumblr.com/38a61fb237faee238aeb4d5ad66b0886/tumblr_ms08kjH3cv1qblxj7o3_1280.jpg"/>
                    <Card name="Estella"  url="https://i.pinimg.com/736x/a4/28/c2/a428c29a8c484778140d8dea23203500--tarot-card-art-tarot-cards-art-illustration.jpg"/>
                    <Card name="Jacob"    url="http://geekologie.com/2013/08/23/lotr-tarot-cards-5.jpg"/>
                    <Card name="Harry"    url="https://i.pinimg.com/originals/41/d5/53/41d5538ed2d66ebc13424ec8e95c56d8.jpg"/>
                </div>
            </Margin>
        )
    }
}
  
const Margin = styled.div`
    margin: 0 auto;
    max-width: 800px;   
`

export default Team;