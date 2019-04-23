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
        return [
        new window.google.maps.LatLng(37.782551, -122.445368),
        new window.google.maps.LatLng(37.782745, -122.444586),
        new window.google.maps.LatLng(37.782842, -122.443688),
        new window.google.maps.LatLng(37.782919, -122.442815),
        new window.google.maps.LatLng(37.782992, -122.442112),
        new window.google.maps.LatLng(37.783100, -122.441461),
        new window.google.maps.LatLng(37.783206, -122.440829),
        new window.google.maps.LatLng(37.783273, -122.440324),
        new window.google.maps.LatLng(37.783316, -122.440023),
        new window.google.maps.LatLng(37.783357, -122.439794),
        new window.google.maps.LatLng(37.783371, -122.439687),
        new window.google.maps.LatLng(37.783368, -122.439666),
        new window.google.maps.LatLng(37.783383, -122.439594),
        new window.google.maps.LatLng(37.783508, -122.439525),
        new window.google.maps.LatLng(37.783842, -122.439591),
        new window.google.maps.LatLng(37.784147, -122.439668),
        new window.google.maps.LatLng(37.784206, -122.439686),
        new window.google.maps.LatLng(37.784386, -122.439790),
        new window.google.maps.LatLng(37.784701, -122.439902),
        new window.google.maps.LatLng(37.784965, -122.439938),
        new window.google.maps.LatLng(37.785010, -122.439947),
        new window.google.maps.LatLng(37.785360, -122.439952),
        new window.google.maps.LatLng(37.785715, -122.440030),
        new window.google.maps.LatLng(37.786117, -122.440119),
        new window.google.maps.LatLng(37.786564, -122.440209),
        new window.google.maps.LatLng(37.786905, -122.440270),
        new window.google.maps.LatLng(37.786956, -122.440279),
        new window.google.maps.LatLng(37.800224, -122.433520),
        new window.google.maps.LatLng(37.800155, -122.434101),
        new window.google.maps.LatLng(37.800160, -122.434430),
        new window.google.maps.LatLng(37.800378, -122.434527),
        new window.google.maps.LatLng(37.800738, -122.434598),
        new window.google.maps.LatLng(37.800938, -122.434650),
        new window.google.maps.LatLng(37.801024, -122.434889),
        new window.google.maps.LatLng(37.800955, -122.435392),
        new window.google.maps.LatLng(37.800886, -122.435959),
        new window.google.maps.LatLng(37.800811, -122.436275),
        new window.google.maps.LatLng(37.800788, -122.436299),
        new window.google.maps.LatLng(37.800719, -122.436302),
        new window.google.maps.LatLng(37.800702, -122.436298),
        new window.google.maps.LatLng(37.800661, -122.436273),
        new window.google.maps.LatLng(37.800395, -122.436172),
        new window.google.maps.LatLng(37.800228, -122.436116),
        new window.google.maps.LatLng(37.800169, -122.436130),
        new window.google.maps.LatLng(37.800066, -122.436167),
        new window.google.maps.LatLng(37.784345, -122.422922),
        new window.google.maps.LatLng(37.784389, -122.422926),
        new window.google.maps.LatLng(37.784437, -122.422924),
        new window.google.maps.LatLng(37.784746, -122.422818),
        new window.google.maps.LatLng(37.785436, -122.422959),
        new window.google.maps.LatLng(37.786120, -122.423112),
        new window.google.maps.LatLng(37.786433, -122.423029),
        new window.google.maps.LatLng(37.786631, -122.421213),
        new window.google.maps.LatLng(37.786660, -122.421033),
        new window.google.maps.LatLng(37.786801, -122.420141),
        new window.google.maps.LatLng(37.786823, -122.420034),
        new window.google.maps.LatLng(37.786831, -122.419916),
        new window.google.maps.LatLng(37.787034, -122.418208),
        new window.google.maps.LatLng(37.787056, -122.418034),
        new window.google.maps.LatLng(37.787169, -122.417145),
        new window.google.maps.LatLng(37.787217, -122.416715),
        new window.google.maps.LatLng(37.786144, -122.416403),
        new window.google.maps.LatLng(37.785292, -122.416257),
        new window.google.maps.LatLng(37.780666, -122.390374),
        new window.google.maps.LatLng(37.780501, -122.391281),
        new window.google.maps.LatLng(37.780148, -122.392052),
        new window.google.maps.LatLng(37.780173, -122.391148),
        new window.google.maps.LatLng(37.780693, -122.390592),
        new window.google.maps.LatLng(37.781261, -122.391142),
        new window.google.maps.LatLng(37.781808, -122.391730),
        new window.google.maps.LatLng(37.782340, -122.392341),
        new window.google.maps.LatLng(37.782812, -122.393022),
        new window.google.maps.LatLng(37.783300, -122.393672),
        new window.google.maps.LatLng(37.783809, -122.394275),
        new window.google.maps.LatLng(37.784246, -122.394979),
        new window.google.maps.LatLng(37.784791, -122.395958),
        new window.google.maps.LatLng(37.785675, -122.396746),
        new window.google.maps.LatLng(37.786262, -122.395780),
        new window.google.maps.LatLng(37.786776, -122.395093),
        new window.google.maps.LatLng(37.787282, -122.394426)
        ];
    }

  render() {
    return (
      <div style={{ width: 500, height: 500 }} id={this.props.id} />
    );
  }
}

export default Map