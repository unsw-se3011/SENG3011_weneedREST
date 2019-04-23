import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';

class ModalInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.updateState(this.props.search_param);
  }

  render() {
    const doc = {
      n : ["e.g. 7", "Max number of results", "number"],
      latitude : ["e.g. 211442.78", "Latitude of area affected", "number"],
      longitude : ["e.g. 3032.12", "Longitude of area affected", "number"],
      key_terms : ["e.g. Malaria, Zika", "Comma separated list of key terms", "text"],
      start_date : ["e.g. 2018-12-10T23:50:00", "Start date of date range", "text"],
      end_date : ["e.g. 2018-12-10T23:50:00", "End date of date range", "text"]
    };

    const search_param = this.props.search_param;

    return (
    <div key={search_param} className="form-group">
      <p className="text-dark">{doc[search_param][1]}</p>
      <input value={this.state.value} onChange={this.handleChange} id={search_param} type={doc[search_param][2]} className="form-control" placeholder={doc[search_param][0]}/>
    </div>
    );
  }
}

class Modal extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      n : undefined,
      latitude : undefined,
      longitude : undefined,
      key_terms : this.props.key_terms,
      start_date : undefined,
      end_date : undefined
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this)
    // this.closeModal = this.closeModal.bind(this);
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
    // TODO: can prolly get rid of params variable

    //Deletes null fields
    Object.keys(params).forEach((key) => (params[key] === undefined) && delete params[key]);

    axios.get('http://46.101.226.130:5000/reports/', {params})
      .then(res => {
        res.data.forEach( obj => delete obj['reports']);
        this.props.updateReports(res);
      });
  }

  updateState(key) {
    const elem = document.getElementById(key);
    let obj = {};
    obj[key] = elem.value;
    // if (key=="key_terms") console.log(elem.value);
    this.setState(obj);
  }

  // closeModal() {
  //   var toggle = this.props.isOpen;
  //   toggle = false;
  //   document.getElementById("modal").className = "modal-false";
  // }

  render () {
    const search_params = ['n', "key_terms", 'longitude', 'latitude', 'start_date', 'end_date'];
    // console.log(this.props.isOpen);
    var toggle = this.props.isOpen;
    return (
      <div id="modal" className={"modal-"+toggle}>
        <div className="modal-header">
          <h5 className="modal-title">Filter Reports</h5>
          {/* <button type="button" class="btn-outline-dark"> X </button> */}
        </div>
        <form id="modal-form" className="form">
          { search_params.map(search_param => <ModalInput key={search_param} search_param={search_param} updateState={this.updateState} value={search_param==="key_terms"?this.props.key_terms:''}/>) }
        </form>
        <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Filter</button>
      </div>
    );
  }
}

export default Modal;