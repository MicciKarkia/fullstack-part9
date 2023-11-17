import { NewPatient } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newPatientInfo: NewPatient = {
      name: parseArg(object.name),
      dateOfBirth: parseArg(object.dateOfBirth),
      ssn: parseArg(object.ssn),
      gender: parseArg(object.gender),
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

export default toNewPatient;
