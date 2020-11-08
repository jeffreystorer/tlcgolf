import firebase from "../firebase";
let firebaseRef = localStorage.getItem("firebaseRef");
const db = firebase.ref("/" + firebaseRef);

const getAll = () => {
  return db;
};

const getLineup = (key) => {
  return db.child(key);
};

const create = (data) => {
  return db.push(data);
};

const update = (key, data) => {
  return db.child(key).update(data);
};

const remove = (key) => {
  return db.child(key).remove();
};

const removeAll = () => {
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
