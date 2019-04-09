import React, {Component} from 'react';
import axios from 'axios';

class Report extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            id: props.match.params.selectedReport
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
            document.getElementById("core").innerHTML = JSON.stringify(response.data);
            });
    }
    render() {
        return (
            
            <div id="core">
                <button type="button" className="button" onClick={this.onSubmit}>Load</button>
            </div>
            
        )
    }
}
export default Report;