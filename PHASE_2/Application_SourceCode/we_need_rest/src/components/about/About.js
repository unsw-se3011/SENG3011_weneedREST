import React, { Component } from 'react';
import styled from 'styled-components';
import './About.css';
import map from './map.png';
import handshake from './handshake.png';
import lightbulb from './lightbulb.png';
import earth from './earth.png';

class About extends Component {
    render() {
      return (
        <Content>
            <div>
                <img id="image" src={map} alt="Map"/>
                <div id="text">
                    <h2>Our Mission </h2><h4>To spend less time <i>searching</i> and more time <i>doing.</i></h4>
                    <br/><br/>
                    <h2>Our Values </h2>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm">
                                <img id="handshake" src={handshake} alt="Handshake"/>
                                <br/>
                                <b>One Platform</b>
                                <p>Outbreak reports, 24/7, all over the world, collated by Sleepy.</p>
                            </div>
                            <div class="col-sm">
                                <img id="lightbulb" src={lightbulb} alt="Lightbulb"/>
                                <br/>
                                <b>Work Smart</b>
                                <p>Leave the heavy lifting to us so you can focus on the
                                    important things.
                                </p>
                            </div>
                            <div class="col-sm">
                                <img id="earth" src={earth} alt="Earth"/>
                                <br/><br/>
                                <b>Evolve</b>
                                <p>There is always room to grow as more resources become available 
                                    in future.</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <h2>Why Sleepy?</h2>
                    <p>We automate the process of obtaining and contextualising data related to diseases and outbreaks for you.</p>
                    <p>Our primary source of data comes from the the Global Incident Map. Along with Google Trends and Twitter, 
                        we collate outbreak information from all over the world onto one platform. Generate report summaries 
                        with graphs, heat maps and other analytics using <b>machine learning</b> and <b>natural langauge processing </b> 
                        with the click of a button.</p>
                </div>
            </div>
                <div id="team">
                    <h2>Meet the Team</h2>
                    <br/>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4">
                            <img id="card3" src="https://i.pinimg.com/736x/42/cd/84/42cd84625ba3ed7f52c5bb81a612486d--tarot-card-art-tarot-cards.jpg"/>
                            <br/><br/>
                            <b>Bailey Ivancic</b>
                            <ul>
                                <li>Team Leader</li>
                                <li>Backend developer</li>
                                <li>Web crawler and API interface</li>
                                <li>Natural Language Processing</li>
                            </ul>
                            </div>
                            <div class="col-md-4">
                                <img id="card3" src="http://66.media.tumblr.com/38a61fb237faee238aeb4d5ad66b0886/tumblr_ms08kjH3cv1qblxj7o3_1280.jpg"/>
                                <br/><br/>
                                <b>Nabil Shaikh</b>
                                <ul>
                                    <li>Backend developer</li>
                                    <li>Frontend developer</li>
                                    <li>Natural Language Processing</li> 
                                </ul>
                            </div>
                            <div class="col-md-4">
                                <img id="card3" src="https://i.pinimg.com/originals/41/d5/53/41d5538ed2d66ebc13424ec8e95c56d8.jpg"/>
                                <br/><br/>
                                <b>Harry Tang</b>
                                <ul>
                                    <li>Backend developer</li>
                                    <li>Web crawler and API interface</li>
                                    <li>Machine Learning</li>
                                </ul>
                            </div>
                        </div>
                        <br/>
                        <div class="row justify-content-around">
                            <div class="col-4">
                                <img id="card2" src="http://geekologie.com/2013/08/23/lotr-tarot-cards-5.jpg"/>
                                <br/><br/>
                                <b>Jacob Wahib</b>
                                <ul>
                                    <li>Frontend developer</li>
                                    <li>Debugger/Tester</li>
                                    <li>Documentation</li>
                                </ul>
                            </div>
                            <div class="col-4">
                                <img id="card2" src="https://i.pinimg.com/736x/a4/28/c2/a428c29a8c484778140d8dea23203500--tarot-card-art-tarot-cards-art-illustration.jpg"/>
                                <br/><br/>
                                <b>Estella Arabi</b>
                                <ul>
                                    <li>Frontend developer</li>
                                    <li>Debugger/Tester</li>
                                    <li>Documentation</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        </Content>
      );
    }
}

const Content = styled.div`
    margin: 0 auto;
`
  
export default About;