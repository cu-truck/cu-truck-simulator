import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';

class Tractor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tractors: []
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
      this.setState({ tractors: data });
    })
  }

  render() {
    return (
      <div>
        <div className="status">Tractors</div>
          {this.state.tractors.map((cargo, i) =>
          <div className="board-row">
            {cargo.telegram}
          </div>
)}
      </div>
    );
  }
}

export default Tractor;
