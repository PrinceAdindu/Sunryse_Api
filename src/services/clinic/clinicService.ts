import {v4 as uuidv4} from "uuid";
import {DocumentData, UpdateData} from "firebase-admin/firestore";
import {hash} from "bcrypt";

import {db} from "../../firebase/firebaseSetup";
import {CustomError, newCustomError} from "../../middleware/error/CustomError";
import {responseDict} from "../../utilities/responsesDictionary";
import {Clinic, NewClinic} from "../../models/clinicModel";
import {
  getNestedProperty,
  setNestedProperty,
} from "../../utilities/objectNestingHelper";
import {Auth} from "../../models/auth/authModel";
import {Account} from "../../models/account/accountModel";

const clinicCollection = db.collection("Clinic");
const archivedClinicCollection = db.collection("Archived Clinic");

export async function createClinic(email: string, password: string) {
  try {
    const id = uuidv4();

    const hashedPassword = await hash(password, 10);

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

async function getClinicData(id: string): Promise<Clinic | null> {
  try {
    const clinicRef = await clinicCollection.doc(id).get();
    const clinicData = clinicRef.data();
    if (!clinicData) {
      return null;
    }
    return clinicData as Clinic;
  } catch (error) {
    throw newCustomError(
      responseDict.unexpectedFb,
      "Error querying clinic by id",
      false,
      error
    );
  }
}

export async function getClinicAccount(id: string): Promise<Account | null> {
  try {
    const clinicData = await getClinicData(id);
    if (!clinicData) {
      return null;
    }
    return clinicData.account;
  } catch (error) {
    throw newCustomError(
      responseDict.unexpectedFb,
      "Error querying clinic by id for auth information",
      false,
      error
    );
  }
}

export async function getClinic(
  id: string,
  propertyPaths?: string[]
): Promise<Partial<Clinic> | Clinic | null> {
  try {
    const clinicRef = await clinicCollection.doc(id).get();
    const clinicData = clinicRef.data();

    if (!clinicData) {
      return null;
    }

    if (propertyPaths) {
      const filteredData = {};
      for (const path in propertyPaths) {
        const value = getNestedProperty(clinicData, path);
        if (value !== undefined) {
          setNestedProperty(filteredData, path, value); // Build nested structure
        }
      }
      return filteredData;
    }

    // Return the whole clinic data if no properties filter is applied
    return clinicData as Clinic;
  } catch (error) {
    throw newCustomError(
      responseDict.unexpectedFb,
      "Error querying clinic by id  and properties",
      false,
      error
    );
  }
}

export async function editClinic(id: string, data: UpdateData<Clinic>) {
  try {
    const clinic = clinicCollection.doc(id);
    await clinic.update(data);
    return clinic;
  } catch (error) {
    throw newCustomError(
      responseDict.unexpectedFb,
      "Error editing clinic field",
      false,
      error
    );
  }
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
