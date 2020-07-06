import React from 'react';
import firebase from './firebase';

class TruckForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {telegram: '', type: ''};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({telegram: event.target.value});
  }

  handleTypeChange(event) {
    this.setState({type: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const db = firebase.firestore();
    /*db.settings({
      timestampsInSnapshots: true
    });*/
    const userRef = db.collection("queue").add({
      telegram: this.state.telegram,
      type: this.state.type
    });
  }

  render() {
    const {
      telegram, type
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input name="telegram" type="text" value={this.state.telegram} onChange={this.handleInputChange} />

          </label>
          <select value={this.state.type} onChange={this.handleTypeChange}>
  <option value="tractor">Tractor</option>
  <option value="container">Container</option>
</select>
        <input type="submit" value="Submit" disabled={telegram === ""}/>
      </form>
    );
  }
}

export default TruckForm;
