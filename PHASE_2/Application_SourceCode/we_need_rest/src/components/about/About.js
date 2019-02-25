import React, { Component } from 'react';
import styled from 'styled-components';
import './About.css';
import 'bootstrap/dist/css/bootstrap.css';

class About extends Component {
    render() {
      return (
        <Content>
            <div id="contentarea"><div class="cell markdown-cell">
            <p>Making an API that collects data from online sources:</p>
            <ul class="task-list">
                <li class="task-list-item"><input class="task-list-item-checkbox" disabled="true" type="checkbox"/> <a href="http://www.promedmail.org">WHO Website – Outbreaks News</a></li>
                <li class="task-list-item"><input class="task-list-item-checkbox" disabled="true" type="checkbox"/> <a href="http://www.promedmail.org">ProMed</a></li>
                <li class="task-list-item"><input class="task-list-item-checkbox" disabled="true" type="checkbox"/> <a href="https://www.cdc.gov/outbreaks/">CDC</a></li>
                <li class="task-list-item"><input class="task-list-item-checkbox" disabled="true" type="checkbox"/> <a href="http://outbreaknewstoday.com">Outbreak News Today</a></li>
                <li class="task-list-item"><input class="task-list-item-checkbox" disabled="true" type="checkbox"/> <a href="http://www.cidrap.umn.edu">CIDRAP</a></li>
                <li class="task-list-item"><input class="task-list-item-checkbox" checked="true" disabled="true" type="checkbox"/> <a href="http://outbreaks.globalincidentmap.com">Global Incident Map</a></li>
                <li class="task-list-item"><input class="task-list-item-checkbox" disabled="true" type="checkbox"/> <a href="https://flutrackers.com/forum/">Flu tracker</a></li>
                <li class="task-list-item"><input class="task-list-item-checkbox" disabled="true" type="checkbox"/> <a href="https://crofsblogs.typepad.com/h5n1/">H5N1</a></li>
            </ul>
            <p>
                <a href="https://webcms3.cse.unsw.edu.au/SENG3011/19T1/resources/24296">Specification</a>
            </p>
            <hr/>
            <h2>Specification Summary</h2>
            <ol>
                <li>Develop an API that gathers data from online sources
                    <ul>
                        <li>scraper to gather data</li>
                        <li>provide diseasereports on demand</li>
                        <li>website with API documentation</li>
                    </ul>
                </li>
                <li>Develop web scrapper with that API
                    <ul>
                        <li>Scrappy module in python</li>
                    </ul>
                </li>
                <li>Website as a central hub with documentation and implementation
                    <ul>
                        <li>REACT with javascript promises</li>
                    </ul>
                </li>
                <li>gather secondary news data from other API
                    <ul>
                        <li>Google API or something</li>
                    </ul>
                </li>
            </ol>

            <p>Note: <a href="https://webcms3.cse.unsw.edu.au/SENG3011/19T1/resources/24299">Github structure</a></p>
            <h3>REACT Tutorials</h3>
            <ul>
                <li><a href="https://blog.pshrmn.com/entry/simple-react-router-v4-tutorial/">REACT Routing</a></li>
                <li><a href="https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2https://blog.pshrmn.com/entry/simple-react-router-v4-tutorial/">REACT API calls</a></li>
                <li><a href="https://reactjs.org/">REACT in general</a> (Tic Tac Toe)</li>
                <li><a href="https://reactjs.org/docs/create-a-new-react-app.html">Create a REACT app</a></li>
                <li><a href="https://realpython.com/the-ultimate-flask-front-end/">Ultimate Flask frontend</a> (Flask, React, Bower, Browserify)</li>
            </ul>
            <p><strong>Further reading</strong></p>
            <ul>
                <li><a href="https://blog.pshrmn.com/entry/how-single-page-applications-work/">SPAs</a></li>
            </ul>
            <h3>Other Tools</h3>
            <ul>
                <li><a href="https://searchmicroservices.techtarget.com/definition/RESTful-API">REST</a></li>
                <li><a href="https://swagger.io/">Swagger</a></li>
                <li><a href="https://flow.org/en/docs/usage/">flow</a></li>
            </ul>
            </div></div>
        </Content>
      );
    }
  }

const Content = styled.div`
    margin: 0 auto;
    max-width: 800px;
`
  
export default About;