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

        this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.onSubmitDelete = this.onSubmitDelete.bind(this);
    }
    onSubmitDelete(e) {
        console.log(this.state.id);
        axios({
            method : 'delete',
            url: "http://46.101.226.130:5000/reports/" + this.state.id,
            responseType: 'json',
            params: {
              password: "sl33py"
            }
            }).then(response => {
                console.log(response.data);
                document.getElementById("text-stuff").innerHTML="Report " + this.state.id + " Deleted!";
                document.getElementById("buttons").style.visibility="hidden";
          });

    }
    onClickUpdate(e) {
        document.getElementById("update").style.visibility="visible";
    }
    onSubmitUpdate(e) {
        console.log(this.state.id);
        console.log(this.state.headline);
        axios({
            method : 'put',
            url: "http://46.101.226.130:5000/reports/" + this.state.id,
            responseType: 'json',
            params: {
                
                ...(this.state.url ? { url: this.state.url } : {}),
                ...(this.state.date_of_publication ? { date_of_publication: this.state.date_pub } : {}),
                ...(this.state.headline ? { headline: this.state.headline } : {}),
                ...(this.state.main_text ? { main_text: this.state.main_text } : {}),
                ...(this.state.disease ? { disease: this.state.disease } : {}),
                ...(this.state.syndrome ? { syndrome: this.state.syndrome } : {}),
                ...(this.state.type ? { type: this.state.type } : {}),
                ...(this.state.latitude ? { latitude: this.state.latitude } : {}),
                ...(this.state.longitude ? { longitude: this.state.longitude } : {}),
                ...(this.state.syndrome ? { 'number-affected': this.state.n_affected } : {}),
                ...(this.state.comment ? { comment: this.state.comment } : {}),
                ...(this.state.syndrome ? { date: this.state.date } : {})
            }
            }).then(response => {
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
                document.getElementById("update").style.visibility="hidden";
          });
    }
    componentWillMount() {
        axios({
            method : 'get',
            url: "http://46.101.226.130:5000/reports/" + this.state.id,
            responseType: 'json'
            })
            .then(response => {
            let data = response.data;
            this.setState({url: response.data.url});
            this.setState({date_pub: data.date_of_publication});
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
            document.getElementById("text-stuff").style.visibility="visible";
            })
            .catch(error => {
                console.log(error.response);
                document.getElementById("text-stuff").innerHTML="Report " + this.state.id + " does not exist or has been deleted";
                document.getElementById("text-stuff").style.visibility="visible";
                document.getElementById("buttons").style.visibility="hidden";
            });;
    }
    render() {
        const publish_date = new Date(this.state.date_pub);
        const event_date = new Date(this.state.date);

        return ( 
            <div id="body" class="text-centre">
                <div id="text-stuff" style={{visibility:"hidden"}}>
                    <h1 className="title">Report {this.state.id}</h1>
                    <br></br>
                    <h3><a href={this.state.url} target="_blank">{this.state.headline}</a></h3>
                    <h5>Published: {publish_date.toDateString()}</h5>
                    <hr></hr>

                    <p><b>Date:</b> {event_date.toDateString()}</p>
                    <h5>Description</h5>
                    <p>{this.state.main_text}</p>
                    
                    <hr></hr>
                    <p><b>Disease:</b> {this.state.disease}</p>
                    <p><b>Syndrome:</b> {this.state.syndrome}</p>
                    <p><b>Event Type:</b> {this.state.type}</p>
                    <p><b>Location(longitude, latitude):</b> {this.state.longitude}, {this.state.latitude}</p>
                    <p><b>Number of people affected:</b> {this.state.n_affected}</p>
                    
                    <p><b>Comment:</b> {this.state.comment}</p>
                </div>
                <div id="buttons">
                    <button type="button" class="btn btn-primary" onClick={this.onClickUpdate}>Edit Report</button>
                    <button type="button" class="btn btn-danger" onClick={this.onSubmitDelete}>Delete Report</button>
                </div>
                <div id="update" style={{visibility: "hidden"}}>
                <form>
                    <div className="url">
                            <p className="text-dark">Source URL</p>
                            <input id = "idURL" onChange={this.updateURL} type="text" className="form-control" placeholder="e.g. http://www.globalincidentmap.com" />
                    </div>
                    <div className="date_pub">
                            <p className="text-dark">Date of Publication</p>
                            <input id = "idDatePub" onChange={this.updateDatePub} type="text" className="form-control" placeholder="e.g. 2018-12-10T23:50:00" />
                    </div>
                    <div className="headline">
                            <p className="text-dark">Report Headline</p>
                            <input id = "idHeadline" onChange={this.updateHeadline} type="text" className="form-control" placeholder="e.g. TANZANIA - Anthrax kills two people in northern Tanzania" />
                    </div>
                    <div className="main_text">
                            <p className="text-dark">Main Text</p>
                            <input id = "idmainText" onChange={this.updateMainText} type="text" className="form-control" placeholder="e.g. 2 people died and 8 others were hospitalized following an anthrax outbreak..." />
                    </div>
                    <div className="disease">
                            <p className="text-dark">Disease</p>
                            <input id = "idDisease" onChange={this.updateDisease} type="text" className="form-control" placeholder="e.g. Anthrax" />
                    </div>
                    <div className="syndrome">
                            <p className="text-dark">Syndrome</p>
                            <input id = "idSyn" onChange={this.updateSyndrome} type="text" className="form-control" placeholder="e.g. Sick syndrome" />
                    </div>
                    <div className="type">
                            <p className="text-dark">Type</p>
                            <input id = "idType" onChange={this.updateType} type="text" className="form-control" placeholder="e.g. Infection" />
                    </div>
                    <div className="longitude">
                            <p className="text-dark">Longitude</p>
                            <input id = "idLong" onChange={this.updateLongitude} type="text" className="form-control" placeholder="e.g. 211442" />
                    </div>
                    <div className="latitude">
                            <p className="text-dark">Latitude</p>
                            <input id = "idLat" onChange={this.updateLatitude} type="text" className="form-control" placeholder="e.g. 123143" />
                    </div>
                    <div className="n_affected">
                            <p className="text-dark">Number Affected</p>
                            <input id = "idNAffected" onChange={this.updateNAffected} type="text" className="form-control" placeholder="e.g. 10" />
                    </div>
                    <div className="comment">
                            <p className="text-dark">Comment</p>
                            <input id = "idComm" onChange={this.updateComment} type="text" className="form-control" placeholder="e.g. Any thoughts or notes you'd like to add." />
                    </div>
                    <div className="date">
                            <p className="text-dark">Date</p>
                            <input id = "idDate" onChange={this.updateDate} type="text" className="form-control" placeholder="e.g. 2018-12-10T23:50:00" />
                    </div>
                </form>
                <button type="button" onClick={this.onSubmitUpdate} class="btn btn-primary" >Confirm</button>
                </div>
            </div>
        )
    }
}
export default Report;