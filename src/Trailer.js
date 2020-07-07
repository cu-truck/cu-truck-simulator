import React from "react";
import ReactDOM from "react-dom";
import firebase from "./firebase";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

class Trailer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailers: []
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    const load = db
      .collection("queue")
      .where("type", "==", "trailer")
      .where("number", ">", 0)
      .orderBy("number")
      .orderBy("timestamp")
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        this.setState({ trailers: data });
      });
  }

  componentWillUnmount() {
    this.load();
  }

  render() {
    return (
      <div className="mb-2">
        <Card>
          <Card.Header as="h5">Trailers</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {this.state.trailers.map((trailer, i) => (
                <ListGroup.Item key={i}>
                  <a href={"https://t.me/" + trailer.telegram}>
                    @{trailer.telegram}
                  </a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Trailer;
