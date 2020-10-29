import firebase from "../firebase";
let ghinNumber = localStorage.getItem("ghinNumber");
const db = firebase.ref("/" + ghinNumber);

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
