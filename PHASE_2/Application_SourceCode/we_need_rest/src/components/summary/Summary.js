import React, {Component} from 'react';
import axios from 'axios';
import { encode } from 'querystring';

class Summary extends Component {
    state = {
        selectedArticles: this.props.location.selectedArticles
    }
    
    render() {
        console.log("IM IN HERE")
        return (
            
            <div>
                <p>We out here</p>
                <p>{this.state.selectedArticles}</p>
            </div>
        );
    }
}

export default Summary;