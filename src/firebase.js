import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCu3ttg9voQH78fk8RQwV6ioz3H4zyfrHg",
   authDomain: "cu-truck-simulator.firebaseapp.com",
   databaseURL: "https://cu-truck-simulator.firebaseio.com",
   projectId: "cu-truck-simulator",
   storageBucket: "cu-truck-simulator.appspot.com",
   messagingSenderId: "683796677635",
   appId: "1:683796677635:web:b7620bad16571aba737a36"
};

firebase.initializeApp(config);

export default firebase;
