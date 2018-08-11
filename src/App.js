import React, { Component } from 'react';


import './App.css';
import * as Componentes from './components/'

const google = window.google;

const geocoder = new google.maps.Geocoder();
let city;

let apiCall = 'api.openweathermap.org/data/2.5/weather?q=London&appid=b1b38249d2f369dcd9d830fed264da8a';



/*fetch(apiCall)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });  */

/*
const fetchItems = () => fetch(
  apiCall,
).then(
  resultado => resultado.json(),
);
*/




function weatherCallback(weatherData){
  console.log(weatherData);
}
    


 if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}

function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    
    codeLatLng(lat, lng)
}

function errorFunction(){
    alert("Geocoder failed");
}

  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
        if (results[1]) {
         //formatted address
         alert(results[0].formatted_address)
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                    //this is the object you are looking for
                    city= results[0].address_components[i];
                  console.log(city);
                    break;
                }
            }
        }
        //city data
        alert(city.short_name + " " + city.long_name)


        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      cityValue: 'Guatemala City' || this.getCity(),
      dateValue: this.obtenerFecha(),
      cityValue2: 'Guatemala City',
    }
  }
  
   
  
  obtenerFecha(){
    
    let today = new Date();
    let dd = today.getDate()
    if(dd<10){
      dd='0'+dd;
      
    }
    
    
    
    let mm = today.getMonth()+1;
    
    if(mm<10){
      mm='0'+mm;
    }
    let year = today.getFullYear();
    today = year+'-'+dd+'-'+mm;
    return today;
  }
  
  showPosition(position) {
     console.log( "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude)
}

 getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.") 
    }
}
  
  
getCity(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    
}
  
}

/*
getWeather(latitude, longtitude) {
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather',
    data: {
      lat: latitude,
      lon: longtitude,
      units: 'imperial',
      APPID: "b1b38249d2f369dcd9d830fed264da8a"
    },
    success: data => {
       console.log(data["main"]["temp"] + " F");
    }
  })
}    
*/
  
  
  render() {
    
    
    const{cityValue} = this.state;
    const{cityValue2} = this.state;
    const{dateValue} = this.state;
    
    return (
      <div className="App">
        <Componentes.Alwaysweatherapp/>
        <p>{cityValue2}</p>
        <Componentes.Weatherimg/>
        <Componentes.Currentweather/>
        <input type = 'text' value={cityValue} onChange={
            e => this.setState({
              cityValue: e.target.value,
            })
          }/>
          
        <input type = 'date' value={dateValue} onChange={
          
            e => this.setState({
              dateValue: e.target.value,
              
            })
          }/>  
        
        <button onClick={()=>this.setState({cityValue2: cityValue})}>Go!</button>
        
         
        
      </div>
    );
  }
}

export default App;


