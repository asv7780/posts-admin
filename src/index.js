import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig =  {
    apiKey: "AIzaSyBZXk-hJClMCXPNBn8XJRg2RsFaBvant-Q",
    authDomain: "posts-making-app.firebaseapp.com",
    databaseURL: "https://posts-making-app.firebaseio.com",
    projectId: "posts-making-app",
    storageBucket: "posts-making-app.appspot.com",
    messagingSenderId: "81525824391",
    appId: "1:81525824391:web:9829694d580b9a10711122"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
