import React, { Component } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import './Predict.css'
import getJson from './prediction.geojson';

// Sources
// https://developers.google.com/maps/documentation/javascript/datalayer
// https://stackoverflow.com/questions/54289417/react-google-maps-how-do-i-create-a-clickable-kml-map-that-shows-me-meta-data-o

var map = ''
var dataLayer = ''

class Predict extends Component  {

    constructor(props){
        super(props)
        this.onScriptLoad = this.onScriptLoad.bind(this)
    }

    onScriptLoad() {
        // CREATE YOUR GOOGLE MAPS
        map = new window.google.maps.Map(
          document.getElementById('map'),
           {
                // ADD OPTIONS LIKE STYLE, CENTER, GESTUREHANDLING, ...
                center: { lat: 1.35, lng: 103.8 },
                zoom: 11,
                gestureHandling: 'greedy',
                disableDefaultUI: true,
            });
    }

    dataHandler = () => {
        for (var i = 0; i < dataLayer.length; i++) {
            map.data.remove(dataLayer[i])
        }

        dataLayer = map.data.loadGeoJson(getJson)

        map.data.setStyle({strokeWeight: 0.5, fillOpacity: 0.6, fillColor: 'red' });

        map.data.addListener('mouseover', (event) => {
            map.data.revertStyle();
            map.data.overrideStyle(event.feature, {strokeWeight: 1, fillOpacity: 0.2 });
            console.log(event.feature)
        });
        
        map.data.addListener('mouseout', (event) => {
            map.data.revertStyle();
        });
    }

    componentDidMount() {
        // LOADING THE GOOGLE MAPS ITSELF
        if (!window.google) {
          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyDs6wvr-TNw6OvBR5LgjH42j7b49h6Zisw';
          var x = document.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
          // Below is important. 
          //We cannot access google.maps until it's finished loading
          s.addEventListener('load', e => {
            this.onScriptLoad()
            this.dataHandler()

          })
        } else {
          this.onScriptLoad()
        }
    }

    render () {
        return (
            <div id='mapContainer' className='mapContainer'>
                <div style={{ width: '1000px', height: '1000px', padding:"30px" }} id='map' />
                <br></br>
                <h4>Accuracy Rate: 75.6%</h4>
            </div>
        );
    }
};

export default Predict;