import React ,{useState}from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { Location, Permissions } from "expo";
import axios from "axios";
import * as WebBrowser from 'expo-web-browser';
//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

//creates marker
// const markerComponent = (props) =>{
//   return <MapView.Marker
//   coordinate={{
//     latitude: {props.lat},
//     longitude: {props.lon}
//   }}
//   title="Haaga-Helia"
// />
import MapView from 'react-native-maps'

const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

export default class MapScreen extends React.Component {
    
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      searchPosition: {
        latitude: 0,
        longitude: 0
      },
      address: "",
      region: "",
      myLat: 0,
      myLon: 0,
      error: ""
    };
    //use this word inside function
    this.onClickfetchData = this.onClickfetchData.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  //takes string input n sets its coordinates to state
  onClickfetchData() {
    const apiKey = "";
    


    let address = this.state.address;
    const urlPath = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
      .then(response => {
        console.log(urlPath);
        //console.log(data.geometry.location);
        const data = response.data.results[0]; //.geometry.location
        console.log(data)
        this.setState({ data });

        let searchPosition = {
          latitude: data.geometry.location.latitude,
          longitude: data.geometry.location.longitude
        };
        //console.log(searchPosition);

        // this.setState({
        //   searchPosition
        // })
      })
      .catch(error => {
        console.log(error);
      });

  }

  //set GPS coordinates from user to state
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        //change txt to float number
        let lat = parseFloat(position.coords.latitude);
        let long = parseFloat(position.coords.longitude);

        let initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta
        };

        this.setState({
          initialPosition: initialRegion,
          //always follow marker
          markerPosition: initialRegion
        });
        console.log("myLocation set");
      },
      error => Alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );

  }

  componentDidMount() {
    this.getLocation();
  }

  // createMarker(props){
  //   return (
  //       <Marker coordinate={props.latlng}>
  //       <MyCustomMarkerView {...marker} />
  //       <Callout>
  //         <MyCustomCalloutView {...marker} />
  //       </Callout>
  //     </Marker>
  //   )
  // }

  // getSF() {
  //   this.setState({

  //   })
  // }

  // onRegionChange(region) {
  //   this.setState({ region });
  // }

  render() {
    //Dark custom map
    const mapStyle = [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#1d2c4d"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8ec3b9"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1a3646"
          }
        ]
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#4b6878"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#64779e"
          }
        ]
      },
      {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#4b6878"
          }
        ]
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#334e87"
          }
        ]
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
          {
            color: "#023e58"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#283d6a"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#6f9ba5"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1d2c4d"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#023e58"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#3C7680"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#304a7d"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#98a5be"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1d2c4d"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#2c6675"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#255763"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#b0d5ce"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#023e58"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#98a5be"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1d2c4d"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#283d6a"
          }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#3a4762"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#0e1626"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#4e6d70"
          }
        ]
      }
    ];
    //test
   
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log(this.state.initialPosition.latitude);

    

   
    return (
      <View style={styles.container}>
      
          
        <TextInput
          style={styles.txtPosition}
          onChangeText={address => this.setState({ address })}
        />
        <Button color={"red"} title="Search" onPress={this.onClickfetchData} />
        <Button title="Find me" onPress={this.getLocation} />

        {/* <Button title="e" onPress={e => console.log(e.nativeEvent)} /> */}

        <MapView
          showsUserLocation={true}
          userLocationAnnotationTitle={"me"}
          followsUserLocation={true}
          provider={"google"}
          // mapType={'terrain'}
          showsIndoorLevelPicker={true}
          customMapStyle={mapStyle}
          //loader
          loadingEnabled={true}
          loadingIndicatorColor={"#606060"}
          //css
          style={{
            flex: 1
          }}
          region={this.state.initialPosition}
          
        >
          {/* <MapView.Circle 
            center={LatLng}
            radius={200}
            strokeWidth={1}
            title="My Location"
          /> */}
          


        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  txtPosition: {
    paddingTop: 40
  },
  component: {
    backgroundColor: '#F0F0FF', 
    // justifyContent: 'center', 
    alignItems: 'center', 
    height: 68,
    shadowColor: '#FFFFFF',
    shadowOffset: {
        width: 0,
        height: 12
    },
    shadowOpacity: 0.2,
    elevation: 12,
    position: 'relative',
    flexDirection: 'row'
}
});
