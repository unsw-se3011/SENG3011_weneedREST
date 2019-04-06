import React, {Component} from 'react';
import axios from '../../../node_modules/axios';
import { encode } from '../../../node_modules/querystring';

class Create extends Component {
    constructor(props){
        super(props);
        
        this.state = {
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
          date : undefined
        }
        
        this.updateURL = this.updateURL.bind(this);
        this.updateDatePub = this.updateDatePub.bind(this);
        this.updateHeadline = this.updateHeadline.bind(this);
        this.updateMainText = this.updateMainText.bind(this);
        this.updateDisease = this.updateDisease.bind(this);
        this.updateSyndrome = this.updateSyndrome.bind(this);
        this.updateType = this.updateType.bind(this);
        this.updateLongitude = this.updateLongitude.bind(this);
        this.updateLatitude = this.updateLatitude.bind(this);
        this.updateNAffected = this.updateNAffected.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    updateURL(event){
        this.setState({ url : event.target.value})
    }

    updateDatePub(event){
        this.setState({ date_pub : event.target.value})
    }

    updateHeadline(event){
        this.setState({ headline : event.target.value})
    }

    updateMainText(event){
        this.setState({ main_text : event.target.value})
    }

    updateDisease(event){
        this.setState({ disease : event.target.value})
    }

    updateSyndrome(event){
        this.setState({ syndrome : event.target.value})
    }

    updateType(event){
        this.setState({ type : event.target.value})
    }

    updateLongitude(event){
        this.setState({longitude : event.target.value})
    }
    
    updateLatitude(event){
        this.setState({latitude : event.target.value})
    }
    
    updateNAffected(event){
        this.setState({ n_affected : event.target.value})
    }
    updateComment(event){
        this.setState({ comment : event.target.value})
    }
    updateDate(event){
        this.setState({ date : event.target.value})
    }
    onSubmit(e) {
        axios({
            method : 'post',
            url: "http://46.101.226.130:5000/reports/",
            responseType: 'json',
            params: {
                url: this.state.url,
                date_of_publication: this.state.date_pub,
                headline: encode(this.state.headline),
                main_text: encode(this.state.main_text),
                disease: this.state.disease,
                ...(this.state.syndrome ? { syndrome: this.state.syndrome } : {}),
                type: this.state.type,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                'number-affected': this.state.n_affected,
                ...(this.state.comment ? { comment: this.state.comment } : {}),
                date: this.state.date
            }
            }).then(response => {
            console.log(response.data);
            document.getElementById("results").innerHTML = JSON.stringify(response.data);
          });
    }
    render() {
        return (
            <div id="body">
                <center>
                    <h1>Create Report</h1>
                </center>
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
            <button type="button" onClick={this.onSubmit} className="button">Submit</button>
            <div id="results">
            
            </div>
        </div>
        );
    }
}

export default Create;