import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

const input = search_param => {
  const doc = {
    n : ["e.g. 7", "Max number of results"],
    latitude : ["e.g. 211442.78", "Latitude of area affected"],
    longitude : ["e.g. 3032.12", "Longitude of area affected"],
    key_terms : ["e.g. Malaria, Zika", "List of key terms"],
    start_date : ["e.g. 2018-12-10T23:50:00", "Start date of date range"],
    end_date : ["e.g. 2018-12-10T23:50:00", "End date of date range "]
  };

  return (
  <div key={search_param} className="form-group">
    <p className="text-dark">{doc[search_param][1]}</p>
    <input id={search_param} type="text" className="form-control" placeholder={doc[search_param][0]}/>
  </div>
  );
};

function Modal(props) {
  const search_params = props.value

  return (
    <div id="modal" className="closed">
      <form id="modal-form" className="form">
        { search_params.map(search_param => input(search_param)) }
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
    </div>
  );
}

function SearchGroup() {
  return (
    <div className="container">
      <div className="row">
        <div className="input-group">
          <input type="text" className="form-control"/>
          <div className="input-group-btn">
            <button id="open-button" type="button" className="btn btn-default dropdown-toggle"><span className="caret"></span></button>
            <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button>
          </div>
        </div>
      </div>
    </div>
  );
}

const articles = article => {

  return (
    <div className="card text-white bg-dark mb-3" style={{maxwidth: 18 + 'em'}}>
      <div className="card-header">{article.url}</div>
      <div className="card-body">
        <h5 className="card-title">{article.id}</h5>
        <p className="card-text">{article.headline}</p>
      </div>
    </div>
  )
};


class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      response: undefined,
      n : undefined,
      latitude : undefined,
      longitude : undefined,
      key_terms : undefined,
      start_date : undefined,
      end_date : undefined
    }
    
    this.selectedArticles = new Set()
  }

  componentDidMount() {
    // Add event listeners for the modal
    var modal = document.querySelector("#modal");
    var openButton = document.querySelector("#open-button");

    openButton.addEventListener("click", function() {
      modal.classList.toggle("closed");
    });

    //add event listers for the search params
    let search_params = Object.keys(this.state).filter(x => x!=='response');
    search_params.forEach( param => {
      let elem = document.querySelector('#'+param);
      let obj = {};
      obj[param] = elem.value;
      elem.addEventListener("input", ()=>{
        obj[param] = elem.value;
        this.setState(obj)
      })
    });

    //add event listener to form
    let form = document.querySelector('#modal-form')
    form.addEventListener('submit', this.handleSubmit)

    axios.get('http://46.101.226.130:5000/reports/')
      .then(res => {
        this.setState({response: res})
      })
  }

  handleSubmit = event => {
    event.preventDefault();

    const params = {
      n : this.state.n,
      latitude : this.state.latitude,
      longitude : this.state.longitude,
      key_terms : this.state.key_terms,
      start_date : this.state.start_date,
      end_date : this.state.end_date
    }

    //Deletes null fields
    Object.keys(params).forEach((key) => (params[key] === undefined) && delete params[key]);

    console.log(params)

    axios.get('http://46.101.226.130:5000/reports/', {params})
      .then(res => {
        this.setState({response: res})
      })
  }

  render() {
    const search_params = Object.keys(this.state).filter(x => x!=='response');
    const data = this.state.response ? this.state.response.data : [];

    return (
      <div>
        <h1 className="title">Sleepy API</h1>
        <SearchGroup/>
        <Modal value={ search_params }/>
        <hr/>
        <div id="results">
          <ul>
            { data.map(article => <li onClick={() => {this.selectedArticles.add(article.id); console.log(this.selectedArticles)}} key={article.id}>{articles(article)}</li>) }
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;