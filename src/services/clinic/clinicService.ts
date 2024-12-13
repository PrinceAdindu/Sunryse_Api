import {v4 as uuidv4} from "uuid";
import {UpdateData} from "firebase-admin/firestore";

import {db} from "../../firebase/firebaseSetup";
import {hashPassword} from "../auth/authService";
import {newCustomError} from "../../middleware/error/CustomError";
import {responseDict} from "../../utilities/responsesDictionary";
import {Clinic, NewClinic} from "../../models/clinicModel";

const clinicCollection = db.collection("Clinic");
const archivedClinicCollection = db.collection("Archived Clinic");

export async function createClinic(email: string, password: string) {
  const id = uuidv4();
  const hashedPassword = await hashPassword(password);

  const newClinic: NewClinic = {
    id: id,
    auth: {
      refreshToken: null,
      otpCode: null,
      otpExpiration: null,
    },
    account: {
      email: email,
      password: hashedPassword,
    },
    officeLocations: [],
    cancellationPolicies: [],
    offerings: [],
    bookings: [],
  };

  try {
    await clinicCollection.doc(id).set(newClinic);
    return newClinic;
  } catch (error) {
    throw newCustomError(
      responseDict.unexpectedFb,
      "Error creating new clinic document",
      false,
      error
    );
  }
}

export async function findClinic(
  id?: string,
  email?: string,
  refreshToken?: string
): Promise<{id: string} | null> {
  try {
    let query =
      clinicCollection as FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;

    if (id) {
      query = query.where("id", "==", id);
    }
    if (email) {
      query = query.where("account.email", "==", email);
    }
    if (refreshToken) {
      query = query.where("auth.refreshToken", "==", refreshToken);
    }

    const querySnapshot = await query.get();
    if (!querySnapshot.empty) {
      const clinic = querySnapshot.docs[0].data();
      return {id: clinic.id};
    } else {
      return null;
    }
  } catch (error) {
    throw newCustomError(
      responseDict.unexpectedFb,
      "Error finding clinic exists with given parameters",
      false,
      error
    );
  }
}

//TODO: Update fields type to be more specific to Clinic
// type ClinicField<T> = T extends object
//   ? {
//       [K in keyof T]: K extends string
//         ? T[K] extends object
//           ? K | `${K}.${ClinicField<T[K]>}`
//           : K
//         : never;
//     }[keyof T]
//   : never;
//TODO: Update return type to also show clinic types
export async function getClinic(id: string, fields?: string[]) {
  try {
    if (!fields) {
      const clinicRef = await clinicCollection.doc(id).get();
      const clinicData = clinicRef.data();
      if (!clinicData) {
        return null;
      }
      return clinicData;
    }

    const clinicSnapshot = await clinicCollection
      .where("id", "==", id)
      .select(...fields)
      .get();

    if (clinicSnapshot.empty) {
      return null;
    }

    const clinicData = clinicSnapshot.docs[0].data();

    return clinicData;
  } catch (error) {
    throw newCustomError(
      responseDict.unexpectedFb,
      "Error querying clinic by id and fields",
      false,
      error
    );
  }
}

export async function editClinic(id: string, data: UpdateData<Clinic>) {
  try {
    const clinicRef = clinicCollection.doc(id);
    await clinicRef.update(data);
    return clinicRef;
  } catch (error) {
    throw newCustomError(
      responseDict.unexpectedFb,
      "Error editing clinic field",
      false,
      error
    );
  }
}

export async function archiveClinic(id: string) {
  const clinicRef = clinicCollection.doc(id);
  await clinicRef.delete();
  await archivedClinicCollection.doc(id).set(clinicRef);
}
