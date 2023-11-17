import { v1 as uuid } from 'uuid';
import allPatients from '../../data/allPatients';
import { Patient, PatientWithoutSsn, NewPatient } from '../types';

const getPatients = ():Patient[] => {
  return allPatients;
};

const getPatientsNoSsn = (): PatientWithoutSsn[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (newPatientData: NewPatient): Patient => {
  const id:string = uuid();

  const newPatient = {
    id: id,
    ...newPatientData
  };

  allPatients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsNoSsn,
  addPatient
};
