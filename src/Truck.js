import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';

class Truck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queueT: [],
      queueC: []
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection("queue")
      .where("type", "==", "tractor")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
      console.log(data);
      this.setState({ queueT: data });
      })

      db.collection("queue")
        .where("type", "==", "container")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          this.setState({queueC: data})
        })
      }

  render() {
    return (
      <div>
        <div className="status">{this.props.truck.tractor}</div>
        {this.props.truck.cargos.map((cargo, i) =>
          <div className="board-row">
            {cargo}
          </div>
        )}
      </div>
    );
  }
}

export default Truck;
