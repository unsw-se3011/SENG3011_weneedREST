import React, {Component} from 'react';
import axios from 'axios';
import { runInThisContext } from 'vm';
import 'bootstrap/dist/css/bootstrap.css';

const articles = article => {
    const handleDelete = (id) => {
      axios.delete('http://46.101.226.130:5000/reports/'+id); 
      const elem = document.querySelector("#item"+id);
      elem.className = 'editing';
    }
    return (
      <div className="card text-white bg-dark mb-3">
        <div className="card-header">
          {article.headline}
          <button onClick={ () => {handleDelete(article.id)} } className="destroy"></button>
        </div>
        <div className="card-body">
          <h5 className="card-title">{article.id}</h5>
          <p className="card-text">{article.main_text}</p>
          <p className="card-text">{new Date(article.date_of_publication).toDateString()}</p>
        </div>
      </div>
    )
  }

class Find extends Component {
    constructor(props){
        super(props);
        
        this.state = {
          repId : undefined,
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
          resp : undefined
        }
        
        this.updateRepId = this.updateRepId.bind(this);
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

        this.onSubmitGet = this.onSubmitGet.bind(this);
        this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
        this.onSubmitDelete = this.onSubmitDelete.bind(this);
        this.onClickUpdate = this.onClickUpdate.bind(this);
    }
    updateRepId(event){
        this.setState({ repId : event.target.value})
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

    onSubmitGet(e) {
        console.log(this.state.repId);
        
        axios({
            method : 'get',
            url: "http://46.101.226.130:5000/reports/" + this.state.repId,
            responseType: 'json'
            })
            .then(response => {
                console.log(response.status);
                if (response.status === 400) {
                    document.getElementById("report").innerHTML="Error: Report not found";
                }
                console.log(response.data.url);
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
                
                document.getElementById("card").style.visibility="visible";
                document.getElementById("deleted").style.visibility="hidden"
            })
            .catch(error => {
                if (error.response.status === 400) {
                    document.getElementById("report").innerHTML="Report not found";
                }
                if (error.response.status === 404) {
                    document.getElementById("report").innerHTML="Please enter Report ID";
                }
            });

    }
    onSubmitDelete(e) {
        console.log(this.state.repId);
        axios({
            method : 'delete',
            url: "http://46.101.226.130:5000/reports/" + this.state.repId,
            responseType: 'json'
            }).then(response => {
                console.log(response.data);
                
                
                document.getElementById("card").style.visibility="hidden";
                document.getElementById("deleted").style.visibility="visible";
          });

    }
    onSubmitUpdate(e) {
        console.log(this.state.repId);
        console.log(this.state.headline);
        axios({
            method : 'put',
            url: "http://46.101.226.130:5000/reports/" + this.state.repId,
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
    onClickUpdate(e) {
        document.getElementById("update").style.visibility="visible";
    }
    
    render() {
        return (
            <div id="body">
                <center>
                    <h1>Find Report</h1>
                </center>
                <form className="id">
                    <div className="ID">
                            <p className="text-dark">Report ID</p>
                            <input id = "id" name="title" onChange={this.updateRepId} type="text" className="form-control" placeholder="e.g. 7213" />
                    </div>
                </form>
                <button type="button" class="btn btn-primary" onClick={this.onSubmitGet}>Get</button>
                <center>
                
                <div id="card" style={{visibility: "hidden"}} >
                    <div className="card text-white bg-dark mb-3">
                        <div className="card-header">
                            {this.state.headline}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{this.state.repId}</h5>
                            <p className="card-text">{this.state.main_text}</p>
                            <p className="card-text">{new Date(this.state.date_pub).toDateString()}</p>
                        </div>
                    </div>
                    
                </div>  
                </center>
                <div id="deleted" style={{visibility: "hidden"}}>
                <p>Deleted report { this.state.repId }</p>
                </div>
                <div id="report">
                
                </div>
                <button type="button" class="btn btn-danger" onClick={this.onSubmitDelete}>Delete</button>
                <button type="button" class="btn btn-primary" onClick={this.onClickUpdate}>Update</button>
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
export default Find;