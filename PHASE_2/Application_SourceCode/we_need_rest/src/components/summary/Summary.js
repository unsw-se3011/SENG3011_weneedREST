import React, {Component} from 'react';
import axios from 'axios';
import { encode } from 'querystring';

const articles = article => {
  const handleDelete = (id) => {
    axios.delete('http://46.101.226.130:5000/reports/'+id); 
    const elem = document.querySelector("#item"+id);
    elem.className = 'editing';
  }
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
    </div>
  )
}


class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
        response : [],
        selectedArticles: props.match.params.selectedArticles.split(','),
        relatedWords: []
    }

    // console.log(this.state.selectedArticles);
  }

  componentWillMount() {
      this.state.selectedArticles.forEach(id => 
        axios.get('http://46.101.226.130:5000/reports/' + id)
            .then(res => {   
              let response = this.state.response;
              response.push(res.data);
              this.setState({response: response})
              console.log(response)
              console.log(this.state)
            })    
      );
    }

    componentDidMount() {
    }
  
    getLocations()
    {

    }

    // Used for calling textRazor API to extract keywords, topics and entities
    textRazor(text) {
        let url = "http://api.textrazor.com/"
        let proxyUrl = "https://cors-anywhere.herokuapp.com/"
    
        return fetch(proxyUrl + url, { 
            body: "extractors=entities,topics,words&text=Spain's stricken Bankia expects to sell", 
            headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Textrazor-Key": "28a4e6569e176326519482635f0384827edf76f93085f9a61774f842" }, 
            method: "POST" })
        .then(res => res.json())
        .then(response => console.log("Success:", JSON.stringify(response), response))
        .catch(error => console.error(error))
    }

  
  render() {
      return (
        <div id="container">
            
            <div id="selected-articles">
                <ul>
                { this.state.response.map(article => <li id={"item"+article.id} key={article.id}>{articles(article)}</li>) }
                </ul>
            </div>
            
            <div id="nlp">
                <button onClick={() => this.textRazor("This is a test disease swine flu")}>textRazor</button>
            </div>

        </div>
        
      );
  }
}

export default Summary;