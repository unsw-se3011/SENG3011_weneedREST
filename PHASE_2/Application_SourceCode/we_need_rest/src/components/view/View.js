import React, {Component} from 'react';
import styled from 'styled-components';

class View extends Component {
    constructor(props){
        super(props);
        
        this.state = {
          n : undefined,
          latitude : undefined,
          longitude : undefined,
          key_terms : undefined,
          start_date : undefined,
          end_date : undefined
        }
        
        this.updateN = this.updateN.bind(this);
        this.updateLatitude = this.updateLatitude.bind(this);
        this.updateLongitude = this.updateLongitude.bind(this);
        this.updateKeyTerms = this.updateKeyTerms.bind(this);
        this.updateStartDate = this.updateStartDate.bind(this);
        this.updateEndDate = this.updateEndDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    updateN(event){
        this.setState({ n : event.target.value})
    }
    updateLatitude(event){
        this.setState({latitude : event.target.value})
    }
    updateLongitude(event){
        this.setState({longitude : event.target.value})
    }
    updateKeyTerms(event){
        this.setState({ key_terms : event.target.value})
    }
    updateStartDate(event){
        this.setState({ start_date : event.target.value})
    }
    updateEndDate(event){
        this.setState({ end_date : event.target.value})
    }
    onSubmit(e) {
        console.log(this.state.n);
        console.log(this.state.latitude);
        console.log(this.state.longitude);
        console.log(this.state.key_terms);
        console.log(this.state.start_date);
        console.log(this.state.end_date);

    }
    render() {
        return (
            <div id="body">
                <center>
                    <h1>View Reports</h1>
                </center>
                <form className="n">
                    <div class="number">
                            <p class="text-dark">Number of Reports</p>
                            <input id = "idn" name="title" onChange={this.updateN} type="text" class="form-control" placeholder="e.g. 7" />
                    </div>
                    <div class="lat">
                            <p class="text-dark">Latitude</p>
                            <input id = "idLat" name="title" onChange={this.updateLatitude} type="text" class="form-control" placeholder="e.g. 211442" />
                    </div>
                    <div class="lon">
                            <p class="text-dark">Longitude</p>
                            <input id = "idLon" name="title" onChange={this.updateLongitude} type="text" class="form-control" placeholder="e.g. 211442" />
                    </div>
                    <div class="terms">
                            <p class="text-dark">Key Terms</p>
                            <input id = "idTerms" name="title" onChange={this.updateKeyTerms} type="text" class="form-control" placeholder="e.g. Malaria, Zika" />
                    </div>
                    <div class="start">
                            <p class="text-dark">From Date/Time:</p>
                            <input id = "idStart" name="title" onChange={this.updateStartDate} type="text" class="form-control" placeholder="e.g. 2018-12-10T23:50:00" />
                    </div>
                    <div class="end">
                            <p class="text-dark">To Date/Time:</p>
                            <input id = "idEnd" name="title" onChange={this.updateEndDate} type="text" class="form-control" placeholder="e.g. 2018-12-10T23:50:00" />
                    </div>
                </form>
                <button type="button" onClick={this.onSubmit} className="button">Get</button>
            </div>
            //{/* {n, latitude, longitude, key terms, start date, end date} */}
        )
    }
}
export default View;