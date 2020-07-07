import React from "react";
import ReactDOM from "react-dom";
import firebase from "./firebase";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

class Tractor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tractors: []
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    const load = db
      .collection("queue")
      .where("type", "==", "tractor")
      .where("number", ">", 0)
      .orderBy("number")
      .orderBy("timestamp")
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        this.setState({ tractors: data });
      });
  }

  componentWillUnmount() {
    this.load();
  }

  render() {
    return (
      <div className="mb-2">
        <Card>
          <Card.Header as="h5">Tractors</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {this.state.tractors.map((cargo, i) => (
                <ListGroup.Item key={i}>
                  @{cargo.telegram} {cargo.number}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Tractor;
