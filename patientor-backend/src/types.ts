export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  NonBinary = 'non-binary',
  Other = 'other'
}

export interface Patient {
  "id": string,
  "name": string,
  "dateOfBirth": string,
  "ssn": string,
  "gender": Gender,
  "occupation": string
}

export type PatientWithoutSsn = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;
