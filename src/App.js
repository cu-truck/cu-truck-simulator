import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Truck from "./Truck.js";
import Trailer from "./Trailer.js";
import Tractor from "./Tractor.js";
import TruckForm from "./TruckForm.js";
import firebase from "./firebase";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function App() {
  const db = firebase.firestore();
  return (
    <Container>
      <div className="title">
        <h1>
          <i className="display-2">CU Truck Simulator </i>
          <small>Convocation Public Beta</small>
        </h1>
      </div>
      <div className="App">
        <h2>Register</h2>
        <TruckForm />
        <Row>
          <Col md={8}>
            <h2>Loading Area</h2>
            <Truck />
          </Col>
          <Col md={4}>
            {/* <Tractor /> */}
            <h2>Waiting Area</h2>
            <Trailer />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default App;
