import React, {Component} from 'react';
import axios from 'axios';
import '../home/Home.css';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

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
  }

  // Used for calling textRazor API to extract keywords, topics and entities
  textRazor() {
    let url = "http://api.textrazor.com/"
    let proxyUrl = "https://cors-anywhere.herokuapp.com/"

    fetch(proxyUrl + url, { 
      method: "POST",
      body: "extractors=entities,topics&text=Spain's stricken Bankia expects to sell", 
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded", 
        "X-Textrazor-Key": "28a4e6569e176326519482635f0384827edf76f93085f9a61774f842" 
      }
    })
      .then(res =>res.json())
      .then(response => { 
        console.log("Success:", JSON.stringify(response), response); 
        this.setState({analysis: response}); 
        console.log(this.state.analysis)
      } )
  }

  onEntering() {
    this.textRazor();
  }

  toggle() {
    this.setState( state => ({ collapse: !state.collapse }) );
  }

  render() {
    const handleDelete = (id) => {
      const elem = document.querySelector("#item"+id);
      elem.className = 'editing';
      this.removeArticle(id);
    }

    console.log("render:"+this.state.response);

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
        <Button color="danger" onClick={this.toggle} style={{ margin: '1rem' }}>Analysis</Button>
        <Collapse isOpen={this.state.collapse} onEntering={this.onEntering}>
          <Card style={{ backgroundColor: '#333', borderColor: '#333' }}>
            <CardBody>
              <ul>
                {/* { entities.map( entry => <li key={entry.id}>{entry}</li> )} */}
              </ul>
            </CardBody>
          </Card>
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