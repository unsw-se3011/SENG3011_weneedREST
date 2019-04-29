import React, {Component} from 'react';
import axios from 'axios';
import './summary.css';
import './react-context-menu.css';
import Article from './Article';
import Map from './Map';
import { Container, Row, Col, Card, CardTitle, CardHeader, CardText, Badge  } from 'reactstrap';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ReactTooltip from 'react-tooltip';

const MENU_TYPE = "entity-menu";

const renderEntities = (analysis, expandSearch)=>{
  let response = []

  let entities = [];
  if ( analysis !== undefined) {
    try {
      response = analysis.response.entities;
      let prev = 0;
      let i = 0;
      for (i in response) {
        if (i%2===0) {
          prev = i;
          continue
        }

        entities.push(createRow(response[prev], response[i], expandSearch))
      }
      if (prev == i && i!==0) {
        entities.push(createRow(response[prev], null, expandSearch))
      }
    } catch (error) {
      response = []
    }
  }

  return entities;
}

const createRow = (a, b, expandSearch) => {
  return (
    <Row>
      {entity(a, expandSearch)}
      {b !== null ? entity(b, expandSearch) : null }
    </Row>
  );
}

const entity = (props, expandSearch) => {
  let badges = [];

  if (props.type === undefined) {
    badges = []
  } else if (props.type instanceof Array) {
    badges = props.type
  } else {
    badges.push(props.type)
  }

  function handleClick(e, data) {
    expandSearch(data.text);
  }

  return (
    <Col sm="6">
      <ContextMenuTrigger id={MENU_TYPE+props.id} holdToDisplay={1000}>
        <Card body>
          <CardHeader data-tip="Textually relevant categories"><ReactTooltip />{badges.map(type => <Badge color="primary">{type}</Badge>)}</CardHeader>
          <CardTitle data-tip="Entity"> <ReactTooltip />{props.id}. {props.entityId}</CardTitle>
          <CardText data-tip="A measure of the language processing engine's confidence an entity is valid within the given document.">
          <ReactTooltip />
            Confidence Score: {props.confidenceScore}<br/>
            Text: {props.matchedText}
          </CardText>
          <a data-tip="Wikipedia page for the selected entity" href={props.wikiLink} target="_blank">Wikipedia Article</a>
        </Card>
      </ContextMenuTrigger>

      <ContextMenu id={MENU_TYPE+props.id}>
        <MenuItem  data={{ text: props.matchedText }} onClick={handleClick}>Expand Search</MenuItem>
        {/* <MenuItem  data={{ item: 'item 2' }}>Menu Item 2</MenuItem>
        <MenuItem divider />
        <MenuItem  data={{ item: 'item 3' }}>Menu Item 3</MenuItem> */}
      </ContextMenu>
    </Col>
  );
}

// function MyApp() {
//   return (
//     <div>
//       <ContextMenuTrigger id={MENU_TYPE} holdToDisplay={1000}>
//         <div className='well'>right click to see the menu</div>
//       </ContextMenuTrigger>

//       <ContextMenu id={MENU_TYPE}>
//         <MenuItem  data={{ item: 'entity' }}>Expand search</MenuItem>
//         {/* <MenuItem  data={{ item: 'item 2' }}>Menu Item 2</MenuItem>
//         <MenuItem divider />
//         <MenuItem  data={{ item: 'item 3' }}>Menu Item 3</MenuItem> */}
//       </ContextMenu>
//     </div>
//   );
// }


class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      analysis: undefined,
      response : [],
      selectedArticles: props.match.params.selectedArticles.split(','),
      relatedWords: [],
      relatedEntities: {},
      relatedTopics: new Set(),
      reportLocations: []
    }

    this.removeArticle = this.removeArticle.bind(this);
    this.changeSummaryName = this.changeSummaryName.bind(this);
    this.expandSearchFromEntity = this.expandSearchFromEntity.bind(this);
    this.expandSearchFromReport = this.expandSearchFromReport.bind(this);
  }

  expandSearchFromReport(search, id) {
    let text = '';

    if (search==="disease") {
      text = this.state.relatedEntities[id].filter(i=>i.search('disease')!==-1).toString();
    } else if (search==="entity") {
      text = this.state.relatedEntities[id].toString();
    } else {
      return;
    }
    
    axios.get('http://46.101.226.130:5000/reports/', {key_terms: text})
      .then(res => {
        let difference = res.data
                 .filter(x => !this.state.response.includes(x))
                 .concat(this.state.response.filter(x => !res.data.includes(x)));
        res.data.forEach( obj => delete obj['reports']);
        this.setState({ response: difference}, console.log('after expand', this.state.response) );
      });
  }

  expandSearchFromEntity(text) {
    axios.get('http://46.101.226.130:5000/reports/', {key_terms: text})
      .then(res => {
        res.data.forEach( obj => delete obj['reports']);
        this.setState({response: this.state.response.concat(res.data)}, console.log(this.state.response));
      });
  }

  // Used for calling textRazor API to extract keywords, topics and entities
  textRazor(text, id) {
    let url = "http://api.textrazor.com/";
    let proxyUrl = "https://cors-anywhere.herokuapp.com/";

    fetch(proxyUrl + url, { 
      method: "POST",
      body: "extractors=entities,topics,words,relations&text="+text, 
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded", 
        "X-Textrazor-Key": "1c89b6ad192f7b32536cd1b7d252c45ea2121272f258df695015a18d" 
      }
    })
      .then(res =>res.json())
      .then(response => { 
        //console.log("Success:", JSON.stringify(response), response); 
        this.setState({analysis: response}); 
        // console.log(this.state.analysis);
        let entities = this.state.relatedEntities;

        for (var i = 0; i < response.response.entities.length; i++) { 
          entities[id] = [];
          entities[id] = entities[id].concat(response.response.entities[i].entityId);
          this.setState({ relatedEntities: entities }); 
        }
        for (var i = 0; i < response.response.coarseTopics.length; i++) { 
          this.state.relatedTopics.add(response.response.coarseTopics[i].label); 
        }

        console.log(this.state.relatedEntities);
      });
  }

  changeSummaryName(){
    let name = prompt("Please enter in a name for summary:");
    if (name == undefined || name == "") {
      name = "Click to edit title"
    }
    document.getElementById("summaryTitle").innerHTML=name;
  }

  removeArticle(id) {
    this.setState( state => ({selectedArticles: state.selectedArticles.remove(id) }) )
  }


  componentWillMount() {
    this.state.selectedArticles.forEach(id => 
      axios.get('http://46.101.226.130:5000/reports/' + id)
        .then(res => {   
          let response = this.state.response;
          response.push(res.data);
          this.setState({response: response})

          // Run textRazor api
          let text = ''.concat(res.data.headline, res.data.main_text);
          this.textRazor(text, id);

          // Save location information for each one
          let newLocation = [];
          //console.log(res);
          newLocation.push(res.data.reports[0].reported_events[0].location.latitude)
          newLocation.push(res.data.reports[0].reported_events[0].location.longitude)
          this.setState({ reportLocations: this.state.reportLocations.concat([newLocation]) });

          console.log("locations",this.state.reportLocations);
        })
    );
  }

  render() {
    const loc = this.state.reportLocations;
    let lat = 37.775;
    let lng = -122.434;

    if (loc.length>1) {
      // console.log("locations-loadd",this.state.reportLocations);
      const lat_arr = loc.map(i=>i[0]);
      const lng_arr = loc.map(i=>i[1]);
      lat = lat_arr.reduce( (a,b)=>a+b )/lat_arr.length;
      lng = lng_arr.reduce( (a,b)=>a+b )/lng_arr.length;

      // console.log("loaded", lat, lng);
    } else if (loc.length===1) {
      lat = loc[0][0];
      lng = loc[0][1];
    }

    return (
      <Container id="canvas">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 4 }}>
            <h1 id="summaryTitle" onClick={this.changeSummaryName}>Click to edit title</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 11, offset: 1 }}>
          <h3>Report heatmap</h3>
            <Map
              key={loc.length}
              id="map"
              options={{
                center: {
                  lat: lat,
                  lng: lng
                },
                zoom: 2, 
              }}
              onMapLoad={()=>{}}
              points={loc}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="6">
          <h3>Selected reports</h3>
            <div id="reports">
              <ul>
                { this.state.response.map(article => 
                    <li id={"item"+article.id} 
                        key={article.id}>
                        {<Article article={article} 
                        remove={this.removeArticle} expandSearch={this.expandSearchFromReport}/>}
                    </li>) 
                }
              </ul>
            </div>
          </Col>
          <Col xs="6">
          <h3>Relevant Entities</h3>
            {renderEntities(this.state.analysis, this.expandSearchFromEntity)}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Summary;