import firebase from "firebase";

import express from "express";
const app = express();
let port = process.env.port || 3000;

const firebaseConfig = {
  apiKey: "AIzaSyAiWRnesdzAF2tztcSmBnJ8qj7yNgRisQc",
  authDomain: "nuxt-f0852.firebaseapp.com",
  databaseURL:
    "https://nuxt-f0852-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nuxt-f0852",
  storageBucket: "nuxt-f0852.appspot.com",
  messagingSenderId: "574393651636",
  appId: "1:574393651636:web:06f92e4eac5aba172c22e1",
  measurementId: "G-JC880CB6HD",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

app.get("/api/test", (req, res) => {
  // res.send(result);
  db.collection("test")
    .doc("test")
    .get()
    .then((test) => {
      res.send(test.data());
    });
});

app.listen(3000, () => console.log("Listening on port 3000..."));
