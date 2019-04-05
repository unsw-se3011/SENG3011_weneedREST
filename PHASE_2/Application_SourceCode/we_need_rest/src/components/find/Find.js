import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';

class Find extends Component {
    constructor(props){
        super(props);
        
        this.state = {
          repId : undefined
        }
        
        this.updateRepId = this.updateRepId.bind(this);
    }
    updateRepId(event){
        this.setState({ repId : event.target.value})
    }
    onSubmit(e) {
        //console.log(this.state.id);
        axios({
            method : 'get',
            url: "http://46.101.226.130:5000/reports/" + this.state.repId,
            responseType: 'json'
            }).then(response => {
            console.log(response.data);
            document.getElementById("report").innerHTML = JSON.stringify(response.data);
          });

    }
    render() {
        return (
            <div id="body">
                <center>
                    <h1>View Report</h1>
                </center>
                <form className="id">
                    <div class="ID">
                            <p class="text-dark">Report ID</p>
                            <input id = "id" name="title" onChange={this.updateRepId} type="text" class="form-control" placeholder="e.g. 7213" />
                    </div>
                </form>
                <button type="button" onClick={this.onSubmit} className="button">Get</button>
                <div id="report">
            
                </div>
            </div>
        )
    }
}
export default Find;