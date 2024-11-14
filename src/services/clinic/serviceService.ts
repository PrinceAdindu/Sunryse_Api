import {getClinic, editClinic} from "./clinicService.js";
import {v4 as uuidv4} from "uuid";

export async function getOffering(clinicId, serviceId) {
  const allServices = await getAllServices(clinicId);
  const service = allServices.find((s) => s.id === serviceId);
  return service;
}

export async function getAllOfferings(clinicId) {
  const clinic = await getClinic({id: clinicId});
  return clinic.services;
}

export async function createOffering(clinicId, serviceData) {
  const defualtFields = {
    id: uuidv4(),
    status: true,
    currency: "CAD",
    createdAt: Date(),
  };
  const newServiceData = {...defualtFields, ...serviceData};
  const services = await getAllOfferings(clinicId);
  services.push(newServiceData);
  const data = {services: services};
  await editClinic(clinicId, data);
}

export async function deleteOffering(clinicId, serviceId) {
  const services = await getAllOfferings(clinicId);
  const updatedServices = services.filter((svc) => svc.id !== serviceId);
  const data = {services: updatedServices};
  await editClinic(clinicId, data);
}

//TODO CHANGE THE WHOLE OBJ
export async function editOffering(clinicId, serviceData) {
  let editedService = {};
  const services = await getAllOfferings(clinicId);
  const updatedServices = services.map((svc) => {
    if (svc.id === serviceData.id) {
      editedService = {...svc, ...serviceData};
      return editedService;
    }
    return svc;
  });
}

// const serviceToUpdate = await getService(clinicId, serviceData.id);
// const updatedService = { ...serviceToUpdate, ...serviceData };
// const errors = checkEndpointData(updatedService, NEW_SERVICE_ENDPOINT_RULES);
// if (Object.keys(errors).length === 0) {
//   await deleteService(clinicId, serviceData.id);
//   await createService(clinicId, updatedService);
// } else throw new Error({ message: 'Invalid service data provided' });
