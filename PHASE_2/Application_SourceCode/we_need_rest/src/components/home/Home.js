import React, { Component } from 'react';
import './Home.css';
import styled from 'styled-components';
import axios from 'axios';

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
      <form className="form">
        { search_params.map(search_param => input(search_param)) }
      </form>
      <button type="submit" className="btn btn-primary">Search</button>
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
  }

  componentDidMount() {
    var modal = document.querySelector("#modal");
    var openButton = document.querySelector("#open-button");

    axios.get('http://46.101.226.130:5000/reports/')
      .then(res => {
        this.setState({response: res})
      })

    openButton.addEventListener("click", function() {
      modal.classList.toggle("closed");
    });
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
            { data.map(article => <li key={article.id}>{articles(article)}</li>) }
          </ul>
        </div>
      </div>
    );
  }
}

const ButtonSearchBar = styled.div`
  border-radius: 100%;
  width: 20px;
  height: 20px;
  background: blue;
`

const SearchbarWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background: red;
`

const SearchInput = styled.input`
  border:none;
  margin-right: 30px;
  background-image:none;
  background-color: red;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
`
  
{/* // <form className="form-inline">
//   <SearchbarWrapper className="form-control">
//     <SearchInput id="searchBar" type="search" placeholder="Search" aria-label="Search"/>
//     <ButtonSearchBar />
//   </SearchbarWrapper>
//   <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
// </form> */}

export default Home;