import React, {Component} from 'react';
import './summary.css';
import { Container, Badge, Card, CardTitle, CardText, Row, Col, CardHeader  } from 'reactstrap';

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
      <div>
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
          {/* <CardFooter className="text-muted">
            <Button id={"art"+article.id} color="danger" onClick={this.toggle} style={{ margin: '1rem' }}>Analysis</Button>
            <hr/>
            <Collapse className="remove-outline" isOpen={this.state.collapse} onEntering={this.onEntering}>
              <div className='text-dark'>
                {entities.map(entry => entry)}
              </div>
            </Collapse>
          </CardFooter> */}
        </div>
      </div>
    )
  }
}

export default Article;