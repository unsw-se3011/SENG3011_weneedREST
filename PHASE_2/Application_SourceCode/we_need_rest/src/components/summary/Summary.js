import React, {Component} from 'react';
import axios from 'axios';
import './summary.css';
import Article from './Article';
import { Container, Row, Col,  } from 'reactstrap';
import ReactTooltip from 'react-tooltip';

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

  // Used for calling textRazor API to extract keywords, topics and entities
  textRazor(text) {
    let url = "http://api.textrazor.com/";
    let proxyUrl = "https://cors-anywhere.herokuapp.com/";

    fetch(proxyUrl + url, { 
      method: "POST",
      body: "extractors=entities,topics,words,relations&text="+text, 
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

  changeSummaryName(){
    let name = prompt("Please enter in a name for summary:");
    if (name == undefined || name == "") {
      name = "Click to edit title"
    }
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
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 4 }}>
            <h1 id="summaryTitle" onClick={this.changeSummaryName}>Click to edit title</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6" style={{"width": "1000px"}}>
            <div id="reports">
              <ul>
                { this.state.response.map(article => 
                    <li id={"item"+article.id} 
                        key={article.id}>{<Article article={article} 
                        remove={this.removeArticle}/>}
                    </li>) 
                }
              </ul>
            </div>
          </Col>
          <Col xs="6">
            RHS page elements here
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Summary;