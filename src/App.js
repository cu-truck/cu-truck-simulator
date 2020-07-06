import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Truck from './Truck.js';
import Container from './Container.js';
import Tractor from './Tractor.js';
import TruckForm from './TruckForm.js';
import firebase from './firebase';

function App() {
  var trucks = Array(5).fill({"tractor":"Truck", "cargos":Array(5).fill("A")})
  const db = firebase.firestore();
  return (

    <div className="App">
      <TruckForm />
      <div id="root"></div>
      {trucks.map((object, i) => <Truck truck={object} key={i} />)}
      <Tractor/>
      <Container/>
    </div>
  );
}

export default App;
