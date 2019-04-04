import React, {Component} from 'react';
import styled from 'styled-components';

class View extends Component {
    render() {
        return (
            // <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
            <div id="body">
                <center>
                    <h1>View Reports</h1>
                </center>
                <div class="criteria">
                        <p for="inputPassword4" class="text-dark">Keywords</p>
                        {/* <input id = "keywords" value="{{keywords}}" type="text" name="title" class="form-control" id="inputPassword4" placeholder="Type in keywords"> */}
                </div>
            </div>
            // {/* {n, latitude, longitude, key terms, start date, end date} */}
        )
    }
}
export default View;