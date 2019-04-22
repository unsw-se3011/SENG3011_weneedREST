import React, {Component} from 'react';
import axios from 'axios';
import '../home/Home.css';
import { Collapse, Button, Badge, Card, CardTitle, CardText, Row, Col, CardHeader  } from 'reactstrap';

const renderEntities = (a, b) => {
  return (
    <Row>
      {entity(a)}
      {b !== null ? entity(b) : null }
    </Row>
  );
}

const entity = (props) => {
  let badges = [];

  if (props.type === undefined) {
    badges = []
  } else if (props.type instanceof Array) {
    badges = props.type
  } else {
    badges.push(props.type)
  }

  return (
    <Col sm="6">
      <Card body>
        <CardHeader>{badges.map(type => <Badge>{type}</Badge>)}</CardHeader>
        <CardTitle>{props.id}. {props.entityId}</CardTitle>
        <CardText>
          Confidence Score: {props.confidenceScore}<br/>
          Text: {props.matchedText}
        </CardText>
        <a href={props.wikiLink} target="_blank">Wikipedia Article</a>
      </Card>
    </Col>
  );
};

const googleTrends = require('google-trends-api');
const HttpsProxyAgent = require('https-proxy-agent');

class Article extends Component {
  constructor(props) {
    super(props)

    this.state = {
      article: props.article,
      analysis: undefined,
      collapse: false
    }

    this.removeArticle = props.removeArticle;
    this.toggle = this.toggle.bind(this);
    this.onEntering = this.onEntering.bind(this);
    //this.textRazor = this.textRazor.bind(this);
  }

  googleTrends()
  {
    let temp = JSON.stringify({keyword: 'Valentines Day'});
    googleTrends.interestOverTime(temp)
    .then(function(results){
      console.log(results);
    })
    .catch(function(err){
      console.error(err);
    });
  }

  // Used for calling textRazor API to extract keywords, topics and entities
  textRazor() {
    let url = "http://api.textrazor.com/";
    let proxyUrl = "https://cors-anywhere.herokuapp.com/";

    fetch(proxyUrl + url, { 
      method: "POST",
      body: "extractors=entities,topics,words,relations&text="+this.state.article.main_text, 
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded", 
        "X-Textrazor-Key": "1c89b6ad192f7b32536cd1b7d252c45ea2121272f258df695015a18d" 
      }
    })
      .then(res =>res.json())
      .then(response => { 
        console.log("Success:", JSON.stringify(response), response); 
        this.setState({analysis: response}); 
        console.log(this.state.analysis);
      })
  }

  onEntering() {
    if (this.state.analysis === undefined ) {
      this.textRazor();
    }
  }

  toggle() {
    this.setState( state => ({ collapse: !state.collapse }) );
    const elem = document.getElementById("art"+this.state.article.id);
    elem.innerHTML = this.state.collapse ? 'Analyse' : 'Hide';
  }

  render() {
    const handleDelete = (id) => {
      const elem = document.querySelector("#item"+id);
      elem.className = 'editing';
      this.removeArticle(id);
    }    
    let response = []

    let entities = [];
    if ( this.state.analysis !== undefined) {
      try {
        response = this.state.analysis.response.entities;
        let prev = 0;
        let i = 0;
        for (i in response) {
          if (i%2===0) {
            prev = i;
            continue
          }

          entities.push(renderEntities(response[prev], response[i]))
        }
        if (prev == i && i!==0) {
          entities.push(renderEntities(response[prev], null))
        }
      } catch (error) {
        console.log(error)
        response = []
      }
    }

    const article = this.state.article;

    return (
      <div className="card text-white bg-dark mb-3">
        <div className="card-header">
          {article.headline}
          <button onClick={ () => {handleDelete(article.id)} } className="destroy"></button>
        </div>
        <div className="card-body">
          <h5 className="card-title">{article.id}</h5>
          <p className="card-text">{article.main_text}</p>
          <p className="card-text">{new Date(article.date_of_publication).toDateString()}</p>
        </div>
        <div>
          <Button onClick={this.googleTrends}>GOOGLE TRENDS</Button>
        <Button id={"art"+article.id} color="danger" onClick={this.toggle} style={{ margin: '1rem' }}>Analysis</Button>
        <hr/>
        <Collapse className="remove-outline" isOpen={this.state.collapse} onEntering={this.onEntering}>
          <div className='text-dark' style={{marginRight: '20px'}}>
            {entities.map(entry => entry)}
          </div>
        </Collapse>
      </div>
      </div>
    )
  }
}

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
        response : [],
        selectedArticles: props.match.params.selectedArticles.split(','),
        relatedWords: [],
        relatedEntities: new Set(),
        relatedTopics: new Set()
    }

    this.removeArticle = this.removeArticle.bind(this);
    this.changeSummaryName = this.changeSummaryName.bind(this);
  }

  changeSummaryName()
  {
    let name = prompt("Please enter in a name for summary:");
    document.getElementById("summaryTitle").innerHTML=name;
  }

  removeArticle(id) {
    this.setState( state => ({selectedArticles: state.selectedArticles.remove(id) }) )
  }

  componentWillMount() {
      this.state.selectedArticles.forEach(id => 
        axios.get('http://46.101.226.130:5000/reports/' + id)
            .then(res => {   
              let response = this.state.response;
              response.push(res.data);
              this.setState({response: response})
            })    
      );
    }

  render() {
    return (
      
      <div id="container">
      <h1 id="summaryTitle" onClick={this.changeSummaryName}>Hello this is a test</h1>
        <div id="results">
          <ul>
          { this.state.response.map(article => <li id={"item"+article.id} key={article.id}>{<Article article={article} remove={this.removeArticle}/>}</li>) }
          </ul>
        </div>
      </div>
    );
  }
}

export default Summary;