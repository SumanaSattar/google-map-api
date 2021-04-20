import './App.css';
import { Component } from 'react';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from 'react-geocode';

Geocode.setApiKey("AIzaSyDjm0gEoKzdVhBbGQHQ7OE3KIdV_zDShpc")

class App extends Component {
  state = {
    address:"",
    city:"",
    area:"",
    state:"",
    zoom:15,
    height:400,
    mapPosition:{
      lat:0,
      lng:0,
    },
    markerPosition:{
      lat:0,
      lng:0,
    }
  }

  onMarkerDrag = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    console.log(newLat)
    console.log(newLng)
    Geocode.fromLatLng(newLat,newLng)
    .then(response=>{
      console.log(response)
    })
  }
  render () {
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 59.334591, lng: 18.063240 }}
      >
        <Marker draggable={true} onDragEnd={this.onMarkerDrag}
          position={{ lat: 59.325695, lng: 18.071869 }}
        >
          <InfoWindow><div>hello</div></InfoWindow>
        </Marker>
      </GoogleMap>
    ));
    return (
      <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjm0gEoKzdVhBbGQHQ7OE3KIdV_zDShpc&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
 
}

export default App;
