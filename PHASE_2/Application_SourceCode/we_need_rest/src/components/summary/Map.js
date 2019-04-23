import React, { Component } from 'react';
import { render } from 'react-dom';

class Map extends Component {
    constructor(props) {
        super(props);

        this.onScriptLoad = this.onScriptLoad.bind(this)
    }

    onScriptLoad() {
        const map = new window.google.maps.Map(
        document.getElementById(this.props.id),
        this.props.options);
        this.props.onMapLoad(map)

        const heatmap = new window.google.maps.visualization.HeatmapLayer({
            data: this.getPoints(),
            map: map
        });
    }

    componentDidMount() {
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyDs6wvr-TNw6OvBR5LgjH42j7b49h6Zisw&libraries=visualization';
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            // Below is important. 
            //We cannot access window.google.maps until it's finished loading
            s.addEventListener('load', e => {
                this.onScriptLoad()
        })
        } else {
            this.onScriptLoad()
        }
    }

    getPoints() {
        return this.props.points.map(i=>new window.google.maps.LatLng(i[0], i[1]));
    }

    render() {
        return (
            <div style={{ width: 800, height: 400 }} id={this.props.id} />
        );
    }
}

export default Map