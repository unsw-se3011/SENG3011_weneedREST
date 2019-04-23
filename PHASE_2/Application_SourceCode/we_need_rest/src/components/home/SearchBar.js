import React, { Component } from 'react';
import './Home.css';
import Modal from './Modal';

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      key_terms: undefined,
      isOpen: false,
    }

    this.toggle = this.toggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({key_terms: event.target.value})
  }

  toggle() {
    this.setState( state => ({ isOpen: !state.isOpen }) );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="input-group">
            <input onChange={this.handleChange} type="text" className="form-control" placeholder="Enter Report ID here"/>
            <button onClick={this.toggle} id="open-button" type="button" className="btn btn-primary">Filter Reports</button>
          </div>
        </div>
        <Modal key={this.state.isOpen+this.state.key_terms} updateReports={this.props.updateReports} isOpen={this.state.isOpen} key_terms={this.state.key_terms}/>
      </div>
    );
  }
}

export default SearchBar;