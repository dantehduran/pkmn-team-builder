import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = firebase.initializeApp({
	apiKey: 'AIzaSyCeFtmoYtYPLCywSNH5BMXyjCM9GeXn-U4',
	authDomain: 'pkmn-team-builder.firebaseapp.com',
	databaseURL: 'https://pkmn-team-builder.firebaseio.com',
	projectId: 'pkmn-team-builder',
	storageBucket: 'pkmn-team-builder.appspot.com',
	messagingSenderId: '186793823032',
	appId: '1:186793823032:web:326c9e952274f13b208fcd',
});

const auth = firebaseConfig.auth();
const fs = firebaseConfig.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { firebaseConfig as fb, auth, fs, timestamp };
