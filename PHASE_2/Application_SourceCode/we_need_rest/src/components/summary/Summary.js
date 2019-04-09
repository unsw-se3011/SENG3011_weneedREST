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

  // Used for calling textRazor API to extract keywords, topics and entities
  textRazor() {
    let url = "http://api.textrazor.com/";
    let proxyUrl = "https://cors-anywhere.herokuapp.com/";

    fetch(proxyUrl + url, { 
      method: "POST",
      body: "extractors=entities,topics&text="+this.state.article.main_text, 
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded", 
        "X-Textrazor-Key": "1c89b6ad192f7b32536cd1b7d252c45ea2121272f258df695015a18d" 
      }
    })
      .then(res =>res.json())
      .then(response => { 
        console.log("Success:", JSON.stringify(response), response); 
        this.setState({analysis: response}); 
        console.log(this.state.analysis)
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
  //   let response = [{
  //       "id": 0,
  //       "type": ["Disease"],
  //       "matchingTokens": [6],
  //       "entityId": "Influenza",
  //       "freebaseTypes": ["/fictional_universe/medical_condition_in_fiction", "/medicine/infectious_disease", "/medicine/icd_9_cm_classification", "/film/film_subject", "/people/cause_of_death", "/medicine/disease", "/medicine/risk_factor"],
  //       "confidenceScore": 3.481,
  //       "wikiLink": "http://en.wikipedia.org/wiki/Influenza",
  //       "matchedText": "flu",
  //       "freebaseId": "/m/0cycc",
  //       "relevanceScore": 0.2125,
  //       "entityEnglishId": "Influenza",
  //       "startingPos": 29,
  //       "endingPos": 32,
  //       "wikidataId": "Q2840"
  //   }, {
  //       "id": 1,
  //       "type": ["Species", "Eukaryote", "Animal", "Mammal"],
  //       "matchingTokens": [5],
  //       "entityId": "Domestic pig",
  //       "freebaseTypes": ["/biology/organism_classification", "/biology/domesticated_animal", "/biology/animal"],
  //       "confidenceScore": 1.213,
  //       "wikiLink": "http://en.wikipedia.org/wiki/Domestic_pig",
  //       "matchedText": "swine",
  //       "freebaseId": "/m/078qb0",
  //       "relevanceScore": 0.0322,
  //       "entityEnglishId": "Domestic pig",
  //       "startingPos": 23,
  //       "endingPos": 28,
  //       "wikidataId": "Q787"
  //   }, {
  //     "id": 1,
  //     "type": ["Species", "Eukaryote", "Animal", "Mammal"],
  //     "matchingTokens": [5],
  //     "entityId": "Domestic pig",
  //     "freebaseTypes": ["/biology/organism_classification", "/biology/domesticated_animal", "/biology/animal"],
  //     "confidenceScore": 1.213,
  //     "wikiLink": "http://en.wikipedia.org/wiki/Domestic_pig",
  //     "matchedText": "swine",
  //     "freebaseId": "/m/078qb0",
  //     "relevanceScore": 0.0322,
  //     "entityEnglishId": "Domestic pig",
  //     "startingPos": 23,
  //     "endingPos": 28,
  //     "wikidataId": "Q787"
  // }]
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
        relatedWords: []
    }

    this.removeArticle = this.removeArticle.bind(this);
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