const db = require('../../firebase/firebaseSetup');
const {
  collection,
  query,
  where,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} = require('firebase/firestore');
const { getClinic, editClinic } = require('./clinicService');
const { v4: uuidv4 } = require('uuid');
const { checkEndpointData } = require('../../utilities/endpointChecks');
const {
  NEW_SERVICE_ENDPOINT_RULES,
} = require('../../middleware/service/verifyNewServiceData');

async function getService(clinicId, serviceId) {
  const allServices = await getAllServices(clinicId);
  const service = allServices.find((s) => s.id === serviceId);
  return service;
}

async function getAllServices(clinicId) {
  const clinic = await getClinic({ id: clinicId });
  return clinic.services;
}

async function createService(clinicId, serviceData) {
  const defualtFields = {
    id: uuidv4(),
    status: true,
    currency: 'CAD',
  };
  const newServiceData = { ...defualtFields, ...serviceData };
  const services = await getAllServices(clinicId);
  services.push(newServiceData);
  const data = { services: services };
  await editClinic(clinicId, data);
}

async function deleteService(clinicId, serviceId) {
  const services = await getAllServices(clinicId);
  const updatedServices = services.filter((s) => {
    s.id !== serviceId;
  });
  const data = { services: updatedServices };
  await editClinic(clinicId, data);
}

async function editService(clinicId, serviceData) {
  const serviceToUpdate = await getService(clinicId, serviceData.id);
  const updatedService = { ...serviceToUpdate, ...serviceData };
  const errors = checkEndpointData(updatedService, NEW_SERVICE_ENDPOINT_RULES);
  if (errors.length === 0) {
    await deleteService(clinicId, serviceData.id);
    await createService(clinicId, updatedService);
  } else throw new Error({ message: 'Invalid service data provided' });
}

// async function editStatus(clinicId, serviceId, status) {
//   const services = await getAllServices(clinicId);
//   const updatedServices = services.map((s) => {
//     if (s.id === serviceId) {
//       return { ...s, status: status };
//     }
//   });
//   const data = { services: updatedServices };
//   await editClinic(clinicId, data);
// }

module.exports = {
  createService,
  getAllServices,
  getService,
  deleteService,
  editService,
};
