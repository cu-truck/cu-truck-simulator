import React from "react";
import firebase from "./firebase";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

class TruckForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: firebase.firestore(),
      telegram: "",
      type: "trailer",
      number: 1
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ telegram: event.target.value });
  }

  handleTypeChange(event) {
    if (event.target.value === "trailer") {
      this.setState({ number: 1 });
    }
    this.setState({ type: event.target.value });
  }

  handleNumberChange(event) {
    this.setState({ number: parseInt(event.target.value) });
  }

  handleSubmit(event) {
    event.preventDefault();
    const db = firebase.firestore();
    /*db.settings({
      timestampsInSnapshots: true
    });*/
    const userRef = this.state.db.collection("queue").add({
      telegram: this.state.telegram,
      type: this.state.type,
      number: this.state.number
    });
  }

  render() {
    const { telegram, type } = this.state;
    return (
      <div className="mb-2">
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Group controlId="truckForm.tgIDInput">
                <Form.Label>Telegram ID</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    name="telegram"
                    type="text"
                    value={this.state.telegram}
                    onChange={this.handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                controlId="truckForm.TypeSelect"
                value={this.state.type}
                onChange={this.handleTypeChange}
              >
                <Form.Label>I am...</Form.Label>
                <Form.Control as="select" defaultValue="trailer">
                  <option value="tractor">Tractor</option>
                  <option value="trailer">Trailer</option>
                </Form.Control>
              </Form.Group>
            </Col>
            {this.state.type === "tractor" ? (
              <Col>
                <Form.Group controlId="truckForm.numberInput">
                  <Form.Label>trailer(s) mountable</Form.Label>
                  <Form.Control
                    name="number"
                    type="number"
                    value={this.state.number}
                    onChange={this.handleNumberChange}
                    min="1"
                    max="5"
                  />
                </Form.Group>
              </Col>
            ) : null}
          </Form.Row>
          <Form.Row>
            <Button
              variant="primary"
              type="submit"
              value="Submit"
              disabled={telegram === ""}
            >
              Submit
            </Button>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

export default TruckForm;
