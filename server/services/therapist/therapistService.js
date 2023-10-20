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

const therapistCollection = collection(db, 'Therapist');

async function getTherapist(properties) {
  let q = query(therapistCollection);

  for (const field in properties) {
    if (properties.hasOwnProperty(field)) {
      q = query(q, where(field, '==', properties[field]));
    }
  }

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const therapist = querySnapshot.docs[0].data();
    return therapist;
  } else {
    return null;
  }
}

async function createTherapist(data) {
  const userId = uuidv4();
  const hashedPwd = await bcrypt.hash(data.password, 10);
  data.password = hashedPwd;
  data.userId = userId;

  const therapist = await setDoc(doc(therapistCollection, userId), data);
  return therapist;
}

async function editTherapist(userId, data) {
  const therapist = doc(therapistCollection, userId);
  await updateDoc(therapist, data);
  return therapist;
}

module.exports = {
  getTherapist,
  createTherapist,
  editTherapist,
};
