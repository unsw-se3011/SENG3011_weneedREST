import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';

const input = (search_param, updateState, value) => {
  const doc = {
    n : ["e.g. 7", "Max number of results"],
    latitude : ["e.g. 211442.78", "Latitude of area affected"],
    longitude : ["e.g. 3032.12", "Longitude of area affected"],
    key_terms : ["e.g. Malaria, Zika", "Comma separated list of key terms"],
    start_date : ["e.g. 2018-12-10T23:50:00", "Start date of date range"],
    end_date : ["e.g. 2018-12-10T23:50:00", "End date of date range "]
  };

  return (
  <div key={search_param} className="form-group">
    <p className="text-dark">{doc[search_param][1]}</p>
    <input value={value} onChange={()=>{updateState(search_param)}} id={search_param} type="text" className="form-control" placeholder={doc[search_param][0]}/>
  </div>
  );
};

class Modal extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      n : undefined,
      latitude : undefined,
      longitude : undefined,
      key_terms : undefined,
      start_date : undefined,
      end_date : undefined,
      isOpen: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this)
  }

  handleSubmit() {
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

    axios.get('http://46.101.226.130:5000/reports/', {params})
      .then(res => {
        res.data.forEach( obj => delete obj['reports']);
        this.props.updateReports(res)
      })
  }

  updateState(key) {
    const elem = document.getElementById(key);
    let obj = {};
    obj[key] = elem.value;
    this.setState(obj);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isOpen: nextProps.isOpen})
    this.setState({key_terms: nextProps.key_terms})
  }

  render () {
    const search_params = ['n', 'longitude', 'latitude', 'start_date', 'end_date'];

    return (
      <div id="modal" className={"modal-"+this.state.isOpen}>
        <div className="modal-header">
          <h5 className="modal-title">Filter Reports</h5>
        </div>
        <form id="modal-form" className="form">
          { input("key_terms", this.updateState, this.state.key_terms) }
          { search_params.map(search_param => input(search_param, this.updateState, "")) }
        </form>
        <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Search</button>
      </div>
    );
  }
}

export default Modal;