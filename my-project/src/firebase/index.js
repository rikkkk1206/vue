import firebase from "firebase/compat/app"
import { getFirestore, doc, setDoc } from "firebase/firestore/lite"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import store from '../store/index'

const firebaseConfig = {
    apiKey: "AIzaSyBLG-bC5ddNFLsd5Hm4pWokQ9o1KKsZgmo",
    authDomain: "fir-2-85e6e.firebaseapp.com",
    projectId: "fir-2-85e6e",
    storageBucket: "fir-2-85e6e.appspot.com",
    messagingSenderId: "196735240700",
    appId: "1:196735240700:web:87759a1b87cdc1513c4a79",
    measurementId: "G-6K8EBM8GNW"
}

export default {
    init() {
        firebase.initializeApp(firebaseConfig);
    },
    async siup(username, password) {
        const auth = getAuth();
        let success = false;
        await createUserWithEmailAndPassword(auth, username, password)
            .then((user) => {
                alert("Create account: " + user.user.email);
                success = true;
            })
            .catch((error) => {
                alert(error.message);
            });
        return success;
    },
    async login(username, password) {
        const auth = getAuth();
        let success = false;
        await signInWithEmailAndPassword(auth, username, password).then(
            (user) => {
                alert("Success!: " + user.user.email);
                success = true;
                store.commit('onAuthStateChanged', user.user.email);
                store.commit('onUserStatusChanged', true);
            },
            (err) => {
                alert(err.message);
            }
        );
        return success;
    },
    async logout() {
        const auth = getAuth();
        let success = false;
        await signOut(auth).then(() => {
            success = true;
        });
        return success;
    },
    onAuth() {
        firebase.auth().onAuthStateChanged(user => {
            user = user ? user : {};
            store.commit('onAuthStateChanged', user);
            store.commit('onUserStatusChanged', user.uid ? true : false);
        });
    },
    userInfoStore(userEmailName) {
        console.log("aa");
        const app = firebase.initializeApp(firebaseConfig);
        const db = getFirestore(app);

        setDoc(doc(db, 'test1', userEmailName), {
            name: userEmailName
        })
    }
}
