import React, { Component } from 'react';

import './App.css';
import * as Componentes from './components/'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      cityValue: 'omegalul',
      dateValue: 'rofl',
      cityValue2: 'fetcheado',
    }
  }
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
          
        <input type = 'text' value={dateValue} onChange={
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

