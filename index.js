import firebase from "firebase";
import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(fileUpload());
app.use(express.json());

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SERDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

app.post("/api/image/upload", (req, res) => {
  const storageRef = storage.ref();
  const image = req.files.file;
  const url = storageRef.child("image/" + image.name);
  const upload = url.put(image.data);
  upload.snapshot.ref.getDownloadURL().then((url) => {
    res.send({ imageURL: url });
  });
});

app.get("/api/food", (req, res) => {
  db.collection("test")
    .doc("food")
    .get()
    .then((test) => {
      res.send(test.data());
    });
});

app.post("/api/food/add", (req, res) => {
  console.log(req.body);
  const food = {};

  db.collection("test")
    .doc("food")
    .update({
      food: firebase.firestore.FieldValue.arrayUnion(req.body),
    })
    .then(() => {
      res.send("성공");
    });
});

app.listen(80, () => console.log("Listening on: http://localhost:4000/"));
