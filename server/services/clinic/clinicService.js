const db = require('../../firebase/firebaseSetup');
const {
  collection,
  query,
  where,
  doc,
  setDoc,
  getDocs,
  updateDoc,
} = require('firebase/firestore');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const clinicCollection = collection(db, 'Clinic');

async function getClinic(properties) {
  let q = query(clinicCollection);

  for (const field in properties) {
    if (properties.hasOwnProperty(field)) {
      q = query(q, where(field, '==', properties[field]));
    }
  }

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const clinic = querySnapshot.docs[0].data();
    return clinic;
  } else {
    return null;
  }
}

async function createClinic(data) {
  const id = uuidv4();
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  data.id = id;

  const clinic = await setDoc(doc(clinicCollection, id), data);
  return clinic;
}

async function editClinic(id, data) {
  console.log(data, id);
  const clinic = doc(clinicCollection, id);
  await updateDoc(clinic, data);
  return clinic;
}

module.exports = {
  getClinic,
  createClinic,
  editClinic,
};
