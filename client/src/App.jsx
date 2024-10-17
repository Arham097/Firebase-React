import React, { useEffect, useState } from "react";
import { app, database } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const App = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const collectionRef = collection(database, "users");
  const auth = getAuth();
  const handleInputs = (e) => {
    let inputs = { [e.target.name]: e.target.value };
    setData({ ...data, ...inputs });
  };
  // const handleSignUp = () => {
  //   createUserWithEmailAndPassword(auth, data.email, data.password)
  //     .then((res) => console.log(res.user))
  //     .catch((err) => alert(err.message));
  // };
  // const handleSignIn = () => {
  //   signInWithEmailAndPassword(auth, data.email, data.password)
  //     .then((res) => console.log(res.user))
  //     .catch((err) => alert(err.message));
  // };
  // const handleSignOut = () => {
  //   signOut(auth)
  //     .then(() => console.log("Sign Out"))
  //     .catch((err) => alert(err.message));
  // };
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       alert("User is signed in");
  //     } else {
  //       alert("User is signed out");
  //     }
  //   });
  // }, []);
  const addData = () => {
    addDoc(collectionRef, data)
      .then(() => {
        alert("Data added successfully");
        getData();
      })
      .catch((err) => alert(err.message));
  };
  const getData = async () => {
    const data = await getDocs(collectionRef);
    setUsers(
      data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
    console.log(users);
  };
  const updateData = (id) => {
    const docRef = doc(database, "users", id);
    updateDoc(docRef, {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    getData();
  };
  const deleteData = (id) => {
    const docRef = doc(database, "users", id);
    deleteDoc(docRef);
    getData();
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App-header">
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="input-fields"
        onChange={(e) => handleInputs(e)}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input-fields"
        onChange={(e) => handleInputs(e)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input-fields"
        onChange={(e) => handleInputs(e)}
      />
      {/* <button onClick={handleSignUp} className="button">
        Sign Up
      </button>
      <button onClick={handleSignIn} className="button">
        Sign In
      </button>
      <button onClick={handleSignOut} className="button">
        Sign Out
      </button> */}
      <button className="button" onClick={addData}>
        Add Data
      </button>
      <button className="button" onClick={getData}>
        Get Data
      </button>
      <br />
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.password}</p>
            <button onClick={() => updateData(user.id)} className="button">
              Update
            </button>
            <br />
            <button onClick={() => deleteData(user.id)} className="button">
              Delete
            </button>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default App;
