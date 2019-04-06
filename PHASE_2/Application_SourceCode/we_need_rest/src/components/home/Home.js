import React, { Component } from 'react';
import './Home.css';

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
    <div id="modal">
      <form className="form">
        { search_params.map(search_param => input(search_param)) }
      </form>
      <button type="submit" className="btn btn-primary">Search</button>
    </div>
  );
}

function SearchGroup() {
  return (
    <form className="form-inline">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  );
}


class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results : undefined,
      n : undefined,
      latitude : undefined,
      longitude : undefined,
      key_terms : undefined,
      start_date : undefined,
      end_date : undefined
    }
  }

  componentDidMount() {
    
  }

  render() {
    const search_params = Object.keys(this.state)

    return (
      <div>
        <h1 className="title">Sleepy API</h1>
        <SearchGroup />
        <hr/>

        <div id="results">
        </div>


        <Modal value={ search_params }/>
      </div>
    );
  }
}
  
export default Home;