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
import AutoComplete from 'react-google-autocomplete';

Geocode.setApiKey("AIzaSyAmWoONstgKBW6ZLV9_MYo5na5TCmIiBD0")

class App extends Component {


  state = {
    
    zoom: 15,
    height: 400,
    mapPosition: {
        lat: 0,
        lng: 0,
    },
    markerPosition: {
        lat: 0,
        lng: 0,
    }
}
handleApiLoaded = (map, maps) => {
  console.log('i m the triagnle')
    const triangleCoords = [
      { lat: 593297, lng: 18.0924 },
      { lat: 59.32794, lng: 18.09139 },
      { lat: 59.32249871, lng: 18.083499666 }
      
    ];
  
     var deliveryTriangle = new maps.Polygon({
      paths: triangleCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35
    });
    deliveryTriangle.setMap(map);
  }
componentDidMount() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          this.setState({
              mapPosition: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
              },
              markerPosition: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
              }
          })
        })
      }
    }

 
 onSelection = (place) => {
    const latValue=place.geometry.location.lat(),
          lngValue=place.geometry.location.lng()
       
          this.setState({
            mapPosition:{
               lat:latValue,
               lng:lngValue
            },
            markerPosition :{
              lat:latValue,
              lng:lngValue
            }
          })
 }

  onMarkerDrag = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    console.log(newLat);
    console.log(newLng);

    this.setState({
      mapPosition:{
         lat:newLat,
         lng:newLng
      },
      markerPosition :{
        lat:newLat,
        lng:newLng
      }
    })
 
    }
  render () {
   
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
        onGoogleApiLoaded={({ map, maps }) =>this.handleApiLoaded(map,maps)}
        yesIWantToUseGoogleMapApiInternals
      >
        <Marker draggable={true} onDragEnd={this.onMarkerDrag}
          position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
        >
          <InfoWindow><div>hello</div></InfoWindow>
        </Marker>
        <AutoComplete onPlaceSelected={this.onSelection} />
      </GoogleMap>
    ));
    return (
      <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmWoONstgKBW6ZLV9_MYo5na5TCmIiBD0&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
 
}

export default App;
