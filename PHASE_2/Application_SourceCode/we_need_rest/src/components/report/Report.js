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
            resp : undefined
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
            this.setState({disease: response.data.disease});
            this.setState({syndrome: response.data.syndrome});
            this.setState({type: response.data.type});
            this.setState({longitude: response.data.longitude});
            this.setState({latitude: response.data.latitude});
            this.setState({n_affected: response.data.n_affected});
            this.setState({comment: response.data.comment});
            this.setState({date: response.data.date});
            this.setState({state: this.state});
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