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
        <h1 className="display-2">
          <i>CU Truck Simulator</i>
        </h1>
      </div>
      <div className="App">
        <TruckForm />
        <Row>
          <Col md={8}>
            <Truck />
          </Col>
          <Col md={4}>
            <Tractor />
            <Trailer />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default App;
