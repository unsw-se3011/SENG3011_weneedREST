import React, {Component} from 'react';
import axios from 'axios';

class Report extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            id: props.match.params.selectedReport,
            url : undefined,
            date_pub : undefined,
            headline : undefined,
            main_text : undefined,
            disease : undefined,
            syndrome : undefined,
            type : undefined,
            longitude : undefined,
            latitude : undefined,
            n_affected : undefined,
            comment : undefined,
            date : undefined,
        }
        console.log(this.state.id);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        console.log(this.state.id);
        axios({
            method : 'get',
            url: "http://46.101.226.130:5000/reports/" + this.state.id,
            responseType: 'json'
            }).then(response => {
            console.log(response.data);
            this.setState({url: response.data.url});
            this.setState({date_pub: response.data.date_of_publication});
            this.setState({headline: response.data.headline});
            this.setState({main_text: response.data.main_text});
            this.setState({disease: response.data.reports[0].disease});
            this.setState({syndrome: response.data.reports[0].syndrome});
            this.setState({type: response.data.reports[0].reported_events[0].type});
            this.setState({longitude: response.data.reports[0].reported_events[0].location.longitude});
            this.setState({latitude: response.data.reports[0].reported_events[0].location.latitude});
            this.setState({n_affected: response.data.reports[0].reported_events[0].n_affected});
            this.setState({comment: response.data.reports[0].comment});
            this.setState({date: response.data.reports[0].reported_events[0].date});
            this.setState({state: this.state});
            console.log(this.state.type);
            console.log(this.state.latitude);
            console.log(this.state.date);
            document.getElementById("text-stuff").style.visibility="visible";
            });
    }
    render() {
        return ( 
            <div id="body" class="text-centre">

                <button type="button" className="button" class="btn btn-primary" onClick={this.onSubmit}>See Report</button>
                <div id="text-stuff" style={{visibility:"hidden"}}>
                    <h1 className="title">Report {this.state.id}</h1>
                    <br></br>
                    <h3>{this.state.headline}</h3>
                    <h5>Published: {this.state.date_pub}</h5>
                    <hr></hr>

                    <p><b>Date:</b> {this.state.date}</p>
                    <h5>Description</h5>
                    <p>{this.state.main_text}</p>
                    
                    <hr></hr>
                    <p><b>Disease:</b> {this.state.disease}</p>
                    <p><b>Syndrome:</b> {this.state.syndrome}</p>
                    <p><b>Event Type:</b> {this.state.type}</p>
                    <p><b>Location(longitude, latitude):</b> {this.state.longitude}, {this.state.latitude}</p>
                    <p><b>Number of people affected:</b> {this.state.n_affected}</p>
                    
                    
                    <p><b>Source:</b> {this.state.url}</p>
                    <p><b>Comment:</b> {this.state.comment}</p>
                </div>
            </div>
        )
    }
}
export default Report;