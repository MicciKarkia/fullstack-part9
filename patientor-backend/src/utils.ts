import { NewPatient, Gender } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newPatientInfo: NewPatient = {
      name: parseArg(object.name),
      dateOfBirth: parseArg(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseArg(object.occupation)
    };
    return newPatientInfo;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseArg = (arg: unknown): string => {
  if (!isString(arg)) {
    throw new Error('Incorrect or missing parameter');
  }
  return arg;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
      throw new Error('Incorrect or missing parameter');
    }
    return ssn;
};

const isSsn = (ssn: string): boolean => {
  return Boolean(ssn.match(/^\d{6}[+-]\d{3}[a-zA-Z0-9]$/));
};

export default toNewPatient;
