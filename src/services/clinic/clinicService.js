import db from "../../firebase/firebaseSetup";
import {
  collection,
  query,
  where,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {hash} from "bcrypt";
import {v4 as uuidv4} from "uuid";
import {createStripeAccount} from "../stripeService";
import {DEFAULT_CLINIC_DATA} from "../../models/clinicModel";

const clinicCollection = collection(db, "Clinic");
const archivedClinicCollection = collection(db, "ArchivedClinic");

export async function createClinic(data) {
  const id = uuidv4();
  data.id = id;

  const hashedPassword = await hash(data.password, 10);
  data.password = hashedPassword;

  const stripeId = await createStripeAccount(data.email);
  data.stripeId = stripeId;

  const clinicData = {...data, ...DEFAULT_CLINIC_DATA};

  const clinic = await setDoc(doc(clinicCollection, id), clinicData);
  return clinic;
}

export async function getClinic(properties) {
  let q = query(clinicCollection);

  for (const field in properties) {
    if (properties.hasOwnProperty(field)) {
      q = query(q, where(field, "==", properties[field]));
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

export async function editClinic(id, data) {
  const clinic = doc(clinicCollection, id);
  await updateDoc(clinic, data);
  return clinic;
}

export async function archiveClinic(id) {
  const clinic = doc(clinicCollection, id);
  await deleteDoc(clinic);
  const archivedClinic = await setDoc(
    doc(archivedClinicCollection, id),
    clinic
  );
  return archivedClinic;
}
