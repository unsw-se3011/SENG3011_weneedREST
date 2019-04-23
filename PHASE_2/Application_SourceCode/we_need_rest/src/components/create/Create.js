import React, {Component} from 'react';
import axios from 'axios';
import { encode } from '../../../node_modules/querystring';
import 'bootstrap/dist/css/bootstrap.css';
import './create.css';

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
            <div>
                <div id="banner" class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 id="big-name" class="display-3">Create Report</h1>
                        <p class="lead text-center text-white">Do you know of an outbreak that we have not recorded? Tell us about it.</p>
                    </div>
                </div>
                <div id="body">
                    <form>
                        <div className="url">
                            <label className="text-dark">Source URL</label>
                            <input id = "idURL" onChange={this.updateURL} type="text" className="form-control" placeholder="e.g. http://www.globalincidentmap.com" />
                        </div>
                        <div className="date_pub">
                            <label className="text-dark">Date of Publication</label>
                            <input id = "idDatePub" onChange={this.updateDatePub} type="text" className="form-control" placeholder="e.g. 2018-12-10T23:50:00" />
                        </div>
                        <div className="headline">
                            <label className="text-dark">Report Headline</label>
                            <input id = "idHeadline" onChange={this.updateHeadline} type="text" className="form-control" placeholder="e.g. TANZANIA - Anthrax kills two people in northern Tanzania" />
                        </div>
                        <div className="main_text">
                            <label className="text-dark">Main Text</label>
                            <textarea class="form-control" id="idmainText" onChange={this.updateMainText} type="text" rows="3" placeholder="e.g. 2 people died and 8 others were hospitalized following an anthrax outbreak..."></textarea>
                        </div>
                        <div className="disease">
                            <label className="text-dark">Disease</label>
                            <input id = "idDisease" onChange={this.updateDisease} type="text" className="form-control" placeholder="e.g. Anthrax" />
                        </div>
                        <div className="syndrome">
                            <label className="text-dark">Syndrome</label>
                            <input id = "idSyn" onChange={this.updateSyndrome} type="text" className="form-control" placeholder="e.g. Sick syndrome" />
                        </div>
                        <div className="type">
                            <label className="text-dark">Type</label>
                            <input id = "idType" onChange={this.updateType} type="text" className="form-control" placeholder="e.g. Infection" />
                        </div>
                        <div className="longitude">
                            <label className="text-dark">Longitude</label>
                            <input id = "idLong" onChange={this.updateLongitude} type="text" className="form-control" placeholder="e.g. 211442" />
                        </div>
                        <div className="latitude">
                            <label className="text-dark">Latitude</label>
                            <input id = "idLat" onChange={this.updateLatitude} type="text" className="form-control" placeholder="e.g. 123143" />
                        </div>
                        <div className="n_affected">
                            <label className="text-dark">Number Affected</label>
                            <input id = "idNAffected" onChange={this.updateNAffected} type="text" className="form-control" placeholder="e.g. 10" />
                        </div>
                        <div className="comment">
                            <label className="text-dark">Comment</label>
                            <textarea class="form-control" id="idComm" onChange={this.updateComment} type="text" rows="3" placeholder="e.g. Any thoughts or notes you'd like to add."></textarea>
                        </div>
                        <div className="date">
                            <label className="text-dark">Date</label>
                            <input id = "idDate" onChange={this.updateDate} type="text" className="form-control" placeholder="e.g. 2018-12-10T23:50:00" />
                        </div>
                        <br></br>
                        <button type="submit" id="submit" class="btn btn-lg btn-primary">Submit</button>
                    </form>
                
                    <div id="results">
                    
                </div> 
            </div>
        </div>
        );
    }
}

export default Create;