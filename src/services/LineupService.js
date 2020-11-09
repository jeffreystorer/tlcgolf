import firebase from "../firebase";

const getAll = (firebaseRef) => {
  const db = firebase.ref("/" + firebaseRef);
  return db;
};

const getLineup = (key, firebaseRef) => {
  const db = firebase.ref("/" + firebaseRef);
  return db.child(key);
};

const create = (data, firebaseRef) => {
  const db = firebase.ref("/" + firebaseRef);
  return db.push(data);
};

const update = (key, data, firebaseRef) => {
  const db = firebase.ref("/" + firebaseRef);
  return db.child(key).update(data);
};

const remove = (key, firebaseRef) => {
  const db = firebase.ref("/" + firebaseRef);
  return db.child(key).remove();
};

const removeAll = (firebaseRef) => {
  const db = firebase.ref("/" + firebaseRef);
  return db.remove();
};

export default {
  getAll,
  getLineup,
  create,
  update,
  remove,
  removeAll,
};
