import React, {Component} from 'react';
import axios from 'axios';

class Report extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            id: props.match.params
        }
        
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        console.log(this.state.id);
        axios({
            method : 'get',
            url: "http://46.101.226.130:5000/reports/" + this.state.id,
            responseType: 'json'
            }).then(response => {
            console.log(response);
            //  var obj = JSON.parse(response.data);
            document.getElementById("body").innerHTML = JSON.stringify(response.data);
            });
    }
    render() {
        return (
            <div id="body">

            </div>
        )
    }
}
export default Report;