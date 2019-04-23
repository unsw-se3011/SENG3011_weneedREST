import React, {Component} from 'react';
import './summary.css';
import { Container, Badge, Card, CardTitle, CardText, Row, Col, CardHeader  } from 'reactstrap';

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