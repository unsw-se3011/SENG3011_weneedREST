import React, { Component } from 'react';
import './Home.css';
import Modal from './Modal';
import axios from 'axios';

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      key_terms: undefined,
      isOpen: false,
    }

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // make sure 'enter' has been pressed
    if (event.keyCode !== 13) {
      return;
    }

    const params = {
      key_terms: event.target.value,
    };

    axios.get('http://46.101.226.130:5000/reports/', {params})
      .then(res => {
        res.data.forEach( obj => delete obj['reports']);
        this.props.updateReports(res);
      })
  }

  handleChange(event) {
    this.setState({key_terms: event.target.value})
  }

  toggle() {
    this.setState( state => ({ isOpen: !state.isOpen }) );
  }

  render() {
    //console.log(this.state.isOpen);
    return (
      <div className="container">
        <div className="row">
        <div className="input-group">
            <input onChange={this.handleChange} onKeyDown={this.handleSubmit} type="text" className="form-control" placeholder="What are you looking for?"/>
            <button onClick={this.toggle} id="open-button" type="button" className="btn btn-default dropdown-toggle">Filter</button>
          </div>
        </div>
        <Modal key={this.state.isOpen+this.state.key_terms} updateReports={this.props.updateReports} isOpen={this.state.isOpen} key_terms={this.state.key_terms}/>
      </div>
    );
  }
}

export default SearchBar;