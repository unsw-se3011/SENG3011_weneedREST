import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';

const articles = (article, handleDelete) => {
  return (
    <div id={'card'+article.id} className="card text-white bg-dark mb-3">
      <div className="card-header">
        {article.headline}
        <button onClick={ () => {handleDelete(article.id)} } className="destroy"></button>
        <div class="text-right">
          <Link to={`/Report/${article.id}`}>
            <button class="btn btn-primary">View Report</button>
          </Link>
        </div>
      </div>
      <div className="card-body" id="body-card">
        <h5 className="card-title">{article.id}</h5>
        <p className="card-text">{article.main_text}</p>
        <p className="card-text">{new Date(article.date_of_publication).toDateString()}</p>
      </div>
    </div>
  )
};

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      response: [],
      selectedArticles: [],
    }

    this.updateReports = this.updateReports.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    axios.get('http://46.101.226.130:5000/reports/')
      .then(res => {
        res.data.forEach( obj => delete obj['reports']);       
        this.setState({response: res.data})
      })
  }

  selectAll() {
    let data = this.state.response;
    data.forEach( i =>this.select(i.id))
    console.log("AFTER", this.state.selectedArticles)
  }

  select(report) {
    //Adds item to array
    let temp = this.state.selectedArticles;

    if (temp.filter(i => i === report).length !== 0) {
      let temp = this.state.selectedArticles.filter(i => i!==report)
    
      this.setState({selectedArticles: temp});

      //add styling
      let elem = document.getElementById('card'+report);
      elem.className = 'card text-white bg-dark mb-3';
      console.log("Deselect", report);
    } else {
      temp.push(report);
      this.setState({selectedArticles: temp});
  
      //add styling
      let elem = document.getElementById('card'+report);
      elem.className = 'card bg-light mb-3';
      console.log("select", report);
    }
  }

  handleDelete(report) {
    // Delete article from response data
    let temp = this.state.response.filter(i => i!==report)
    this.setState({selectedArticles: temp})

    // Delete report in backend
    console.log('http://46.101.226.130:5000/reports/'+report);
    axios({
            method : 'delete',
            url: "http://46.101.226.130:5000/reports/" + report,
            responseType: 'json',
            params: {
              password: "sl33py"
            }
            }).then(response => {
                console.log(response.data);
          }); 
    const elem = document.querySelector("#item"+report);
    elem.className = 'editing';
  }

  updateReports(res) {
    this.setState({response: res.data})
  }

  render() {
    let data = this.state.response;

    data.sort( (a, b) => new Date(b.date_of_publication) - new Date(a.date_of_publication) )

    return (
      <div>
        <h1 className="title">Sleepy API</h1>
        <SearchBar updateReports={this.updateReports}/>
        <div class="btn-group">
          <button type="button" className="btn btn-secondary" onClick={this.selectAll} id="selectAllBtn">Select All</button>
          <Link to={`/summary/${this.state.selectedArticles}`}>
            <button type="submit" className="btn btn-primary" id="summaryBtn">Get Summary</button>
          </Link>
        </div>
        <hr/>
        <div id="results">
          <ul>
            { data.map(article => <li id={"item"+article.id} onClick={() => {this.select(article.id)}} key={article.id}>{articles(article, this.handleDelete)}</li>) }
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;