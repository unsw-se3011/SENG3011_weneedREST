import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const input = (search_param, updateState) => {
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
    <input onChange={()=>{updateState(search_param)}} id={search_param} type="text" className="form-control" placeholder={doc[search_param][0]}/>
  </div>
  );
};

function Modal(props) {
  const search_params = props.value;

  const toggleModal = ()=>{
    const modal = document.querySelector("#modal");
    modal.classList.toggle("closed");
  }

  return (
    <div id="modal" className="closed">
      <div class="modal-header">
        <h5 class="modal-title">Filter Reports</h5>
        <button onClick={()=>{toggleModal()}} type="button" class="btn-outline-dark"> X </button>
      </div>
      <form id="modal-form" className="form">
        { search_params.map(search_param => input(search_param, props.updateState)) }
        <button onClick={()=>{props.handleSubmitFilter(); toggleModal()}} type="submit" className="btn btn-primary">Search</button>
      </form>
    </div>
  );
}

function SearchGroup() {
  const toggleModal = ()=>{
    const modal = document.querySelector("#modal");
    modal.classList.toggle("closed");
  }

  return (
    <div className="container">
      <div className="row">
        <div className="input-group">
          <input type="text" className="form-control"/>
          <button onClick={()=>{toggleModal()}} id="open-button" type="button" className="btn btn-default dropdown-toggle"><span className="caret"></span></button>
        </div>
      </div>
    </div>
  );
}

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
        <button type="button" class="btn btn-light" id="selectBtn" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={ () => {document.getElementById("body-card").style="background-color:DodgerBlue"}}></button>
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
      response: undefined,
      selectedArticles: [],
      n : undefined,
      latitude : undefined,
      longitude : undefined,
      key_terms : undefined,
      start_date : undefined,
      end_date : undefined
    }

    this.routeSummary = this.routeSummary.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleSubmitFilter = this.handleSubmitFilter.bind(this);
  }

  updateState(key) {
    const elem = document.getElementById(key);
    let obj = {};
    obj[key] = elem.value;
    this.setState(obj);
  }

  routeSummary() {
    let path = "/summary";
    this.props.history.push({pathname:path, selectedArticles:this.selectedArticles});
  }

  componentWillMount() {
    axios.get('http://46.101.226.130:5000/reports/')
      .then(res => {
        res.data.forEach( obj => delete obj['reports']);       
        this.setState({response: res})
      })
  }

  select(report) {
    let temp = this.state.selectedArticles;
    temp.push(report);
    this.setState({selectedArticles: temp});
    console.log(this.state.selectedArticles);
  }

  handleSubmitFilter() {
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

    console.log(params);

    axios.get('http://46.101.226.130:5000/reports/', {params})
      .then(res => {
        res.data.forEach( obj => delete obj['reports']);
        this.setState({response: res})
      })
  }

  render() {
    const search_params = ['n', 'longitude', 'latitude', 'start_date', 'end_date', 'key_terms'];
    let data = this.state.response ? this.state.response.data : [];

    data.sort( (a, b) => new Date(b.date_of_publication) - new Date(a.date_of_publication) )

    return (
      <div>
        <h1 className="title">Sleepy API</h1>
        <SearchGroup/>
        <Modal value={ search_params } updateState={this.updateState} handleSubmitFilter={this.handleSubmitFilter}/>
        
        <Link to={`/summary/${this.state.selectedArticles}`}>
          <button type="submit" class="btn btn-primary" id="summaryBtn">Get Summary</button>
        </Link>
        <hr/>
        <div id="results">
          <ul>
            { data.map(article => <li id={article.id} onClick={() => {this.select(article.id)}} key={article.id}>{articles(article)}</li>) }
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;