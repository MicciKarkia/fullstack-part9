import allPatients from '../../data/allPatients';
import { Patient, PatientWithoutSsn } from '../types';

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

export default {
  getPatients,
  getPatientsNoSsn
};
