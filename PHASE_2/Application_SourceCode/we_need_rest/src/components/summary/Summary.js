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
        selectedArticles: props.match.params.selectedArticles.split(',')
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
    //   console.log(this.state.response)
    }
  
  
  render() {
      return (
          <div id="results">
          <p>We out here</p>
              <p>{this.state.selectedArticles}</p>
          <ul>
            { this.state.response.map(article => <li id={"item"+article.id} key={article.id}>{articles(article)}</li>) }
          </ul>
        </div>
      );
  }
}

export default Summary;