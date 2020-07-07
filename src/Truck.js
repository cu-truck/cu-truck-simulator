import React from "react";
import ReactDOM from "react-dom";
import firebase from "./firebase";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

class Truck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      truck: []
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    const load = db
      .collection("truck")
      .orderBy("number")
      .orderBy("timestamp")
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        this.setState({ truck: data });
      });
  }

  componentWillUnmount() {
    this.load();
  }

  render() {
    return (
      <div className="mb-2">
        {this.state.truck.map((truck, i) => (
          <Card key={i} className="mb-2">
            <Card.Header as="h5">Truck</Card.Header>
            <Card.Body>
              <Card.Title>Tractor @{truck.telegram}</Card.Title>
              <ListGroup variant="flush">
                {truck.trailers.map((trailer, j) => (
                  <ListGroup.Item key={j}>{trailer}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default Truck;
