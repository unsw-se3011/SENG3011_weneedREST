import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';

const articles = (article, handleDelete, selected, select) => {
  const classText = selected ? "card bg-light mb-3":"card text-white bg-dark mb-3";

  return (
    <div onClick={()=>select(article.id)} id={'card'+article.id} className={classText}>
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
    this.select = this.select.bind(this);
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
    data = data.map(i=>i.id);

    if (this.state.selectedArticles.length > 0) {
      this.setState({selectedArticles: []});
    } else {
      this.setState({selectedArticles: data});
    }
  }

  select(report) {
    //Adds item to array
    let articles = this.state.selectedArticles;

    if ( articles.includes(report) ) {
      articles = articles.filter(i => i!==report);
      this.setState({selectedArticles: articles});
    } else {
      articles.push(report);
      this.setState({selectedArticles: articles});
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
        <div id="banner" class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 id="big-name" class="display-3">Sleepy API</h1>
            {/* <hr class="my-3"></hr> */}
            <SearchBar updateReports={this.updateReports}/>
            <div class="btn-group">
              <button type="button" className="btn btn-secondary" onClick={this.selectAll} id="selectAllBtn">Select All</button>
              <Link to={`/summary/${this.state.selectedArticles}`}>
                <button type="submit" className="btn btn-primary" id="summaryBtn">Get Summary</button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* <hr/> */}
        <div id="results">
          <ul>
            { data.map(article => 
              <li id={"item"+article.id}  
                  key={article.id}>
                    {articles(article, 
                      this.handleDelete, 
                      this.state.selectedArticles.includes(article.id), 
                      this.select)}
              </li>) 
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;