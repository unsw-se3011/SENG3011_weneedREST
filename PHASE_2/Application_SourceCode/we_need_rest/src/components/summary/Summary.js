import React, {Component} from 'react';
import axios from 'axios';
import { encode } from 'querystring';

class Summary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedArticles: props.match.params.selectedArticles
        }

        console.log(props);
    }
    
    render() {
        return (
            
            <div>
                <p>We out here</p>
                <p>{this.state.selectedArticles}</p>
            </div>
        );
    }
}

export default Summary;