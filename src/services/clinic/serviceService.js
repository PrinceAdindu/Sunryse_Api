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
import {getClinic, editClinic} from "./clinicService";
import {v4 as uuidv4} from "uuid";
import {checkEndpointData} from "../../utilities/endpointChecks";
import {NEW_SERVICE_ENDPOINT_RULES} from "../../middleware/service/verifyNewServiceData";

export async function getService(clinicId, serviceId) {
  const allServices = await getAllServices(clinicId);
  const service = allServices.find((s) => s.id === serviceId);
  return service;
}

export async function getAllServices(clinicId) {
  const clinic = await getClinic({id: clinicId});
  return clinic.services;
}

export async function createService(clinicId, serviceData) {
  const defualtFields = {
    id: uuidv4(),
    status: true,
    currency: "CAD",
    createdAt: Date(),
  };
  const newServiceData = {...defualtFields, ...serviceData};
  const services = await getAllServices(clinicId);
  services.push(newServiceData);
  const data = {services: services};
  await editClinic(clinicId, data);
}

export async function deleteService(clinicId, serviceId) {
  const services = await getAllServices(clinicId);
  const updatedServices = services.filter((svc) => svc.id !== serviceId);
  const data = {services: updatedServices};
  await editClinic(clinicId, data);
}

export async function editService(clinicId, serviceData) {
  let editedService = {};
  const services = await getAllServices(clinicId);
  const updatedServices = services.map((svc) => {
    if (svc.id === serviceData.id) {
      editedService = {...svc, ...serviceData};
      return editedService;
    }
    return svc;
  });
  const errors = checkEndpointData(editedService, NEW_SERVICE_ENDPOINT_RULES);
  if (Object.keys(errors).length === 0) {
    const data = {services: updatedServices};
    await editClinic(clinicId, data);
  } else throw new Error({message: "Invalid service data provided"});
}

// const serviceToUpdate = await getService(clinicId, serviceData.id);
// const updatedService = { ...serviceToUpdate, ...serviceData };
// const errors = checkEndpointData(updatedService, NEW_SERVICE_ENDPOINT_RULES);
// if (Object.keys(errors).length === 0) {
//   await deleteService(clinicId, serviceData.id);
//   await createService(clinicId, updatedService);
// } else throw new Error({ message: 'Invalid service data provided' });
