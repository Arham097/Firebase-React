import React, { useEffect, useState } from "react";
import { app, database, storage } from "./firebaseConfig";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
const OldWork = () => {
  const auth = getAuth();
  const collectionRef = collection(database, "users");
  const [data, setData] = useState({
    age: "",
    email: "",
    name: "",
  });
  const emailQuery = query(
    collectionRef,
    where("email", "==", "ibad420@gmail.com")
  );
  // const handleInput = (e) => {
  //   let newInput = { [e.target.name]: e.target.value };
  //   setData({ ...data, ...newInput });
  //   console.log(data);
  // };
  // const storageRef = ref(storage, "images/" + data.name);
  // const handleSubmit = () => {
  //   const uploadTask = uploadBytesResumable(storageRef, data);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //       }
  //     },
  //     (error) => {
  //       console.log(error.message);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log("File available at", downloadURL);
  //       });
  //     }
  //   );
  // };
  const AddData = () => {
    addDoc(collectionRef, {
      age: data.age,
      email: data.email,
      name: data.name,
    })
      .then((res) => {
        alert("Data added successfully");
        getData();
      })
      .catch((err) => alert(err.message));
  };
  // const getData = () => {
  //   getDocs(collectionRef)
  //     .then((res) => {
  //       console.log(
  //         res.docs.map((doc) => {
  //           return { ...doc.data(), id: doc.id };
  //         })
  //       );
  //     })
  //     .catch((err) => alert(err.message));
  // };
  // const updateData = () => {
  //   const docRef = doc(database, "users", "Cv09DcvqisCh4PZxkaa7");
  //   updateDoc(docRef, {
  //     email: data.email,
  //     password: data.password,
  //   })
  //     .then(() => alert("Data updated successfully"))
  //     .catch((err) => alert(err.message));
  // };
  // const deleteData = () => {
  //   const docRef = doc(database, "users", "Cv09DcvqisCh4PZxkaa7");
  //   deleteDoc(docRef)
  //     .then(() => alert("Data deleted successfully"))
  //     .catch((err) => alert(err.message));
  // };

  const getData = () => {
    onSnapshot(collectionRef, (data) => {
      console.log(data.docs.map((doc) => doc.data()));
    });
  };
  const handleInput = (e) => {
    let newInput = { [e.target.name]: e.target.value };
    setData({ ...data, ...newInput });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => alert("User Signed In"))
      .catch((err) => alert(err.message));
  };
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password);
  };
  const handleSignOut = () => {
    signOut(auth);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        alert("User is signed in");
      } else {
        alert("User is signed out");
      }
    });
  }, []);
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => handleInput(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleInput(e)}
        />

        {/* <input type="file" onChange={(e) => setData(e.target.files[0])} /> */}
      </div>
      <button onClick={handleSignUp}>Sign Up</button>
      <br />
      <button onClick={handleSignIn}>Sign In</button>
      <br />
      <button onClick={handleSignOut}>Sign Out</button>
      <br />
      <br />
      <input
        type="text"
        placeholder="Name"
        name="name"
        onChange={(e) => handleInput(e)}
      />
      <br />
      <input
        type="number"
        placeholder="Age"
        name="age"
        onChange={(e) => handleInput(e)}
      />{" "}
      <br />
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={(e) => handleInput(e)}
      />
      <br />
      <button onClick={AddData}>Add Data</button>
      {/* <button onClick={getData}>Get Docs</button>
      <button onClick={updateData}>Update</button>
      <button onClick={deleteData}>Delete</button> */}
    </>
  );
};

export default OldWork;
