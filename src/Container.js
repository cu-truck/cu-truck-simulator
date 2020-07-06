import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containers: []
    };
  }


  componentDidMount() {
    const db = firebase.firestore();
    db.collection("queue")
      .where("type", "==", "container")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
      console.log(data);
      this.setState({ containers: data });
    })
  }

  render() {
    return (
      <div>
        <div className="status">Containers</div>
          {this.state.containers.map((cargo, i) =>
          <div className="board-row">
            {cargo.telegram}
          </div>
)}
      </div>
    );
  }
}

export default Container;
