import React, {Component} from 'react';
import axios from 'axios';

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
        axios({
            method : 'get',
            url: "http://46.101.226.130:5000/reports/",
            responseType: 'json',
            params: {
                ...(this.state.n ? { n: this.state.n } : {}),
                ...(this.state.latitude ? { latitude: this.state.latitude } : {}),
                ...(this.state.longitude ? { longitude: this.state.longitude } : {}),
                ...(this.state.key_terms ? { key_terms: this.state.key_terms } : {}),
                ...(this.state.start_date ? { 'start-date': this.state.start_date } : {}),
                ...(this.state.end_date ? { 'end-date': this.state.end_date } : {})
            }
            }).then(response => {
            console.log(response);
            //  var obj = JSON.parse(response.data);
            document.getElementById("results").innerHTML = JSON.stringify(response.data);
            });
    }
    render() {
        return (
            <div id="body">
                <center>
                    <h1>View Reports</h1>
                </center>
                <form className="n">
                    <div className="number">
                            <p className="text-dark">Number of Reports</p>
                            <input id = "idn" name="title" onChange={this.updateN} type="text" className="form-control" placeholder="e.g. 7" />
                    </div>
                    <div className="lat">
                            <p className="text-dark">Latitude</p>
                            <input id = "idLat" name="title" onChange={this.updateLatitude} type="text" className="form-control" placeholder="e.g. 211442" />
                    </div>
                    <div className="lon">
                            <p className="text-dark">Longitude</p>
                            <input id = "idLon" name="title" onChange={this.updateLongitude} type="text" className="form-control" placeholder="e.g. 211442" />
                    </div>
                    <div className="terms">
                            <p className="text-dark">Key Terms</p>
                            <input id = "idTerms" name="title" onChange={this.updateKeyTerms} type="text" className="form-control" placeholder="e.g. Malaria, Zika" />
                    </div>
                    <div className="start">
                            <p className="text-dark">From Date/Time:</p>
                            <input id = "idStart" name="title" onChange={this.updateStartDate} type="text" className="form-control" placeholder="e.g. 2018-12-10T23:50:00" />
                    </div>
                    <div className="end">
                            <p className="text-dark">To Date/Time:</p>
                            <input id = "idEnd" name="title" onChange={this.updateEndDate} type="text" className="form-control" placeholder="e.g. 2018-12-10T23:50:00" />
                    </div>
                </form>
                <button type="button" onClick={this.onSubmit} className="button">Get</button>
                <div id="results">
            
                </div>
            </div>
        )
    }
}
export default View;