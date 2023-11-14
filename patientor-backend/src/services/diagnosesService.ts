import allDiagnoses from '../../data/allDiagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = ():Diagnosis[] => {
  return allDiagnoses;
};

export default {
  getDiagnoses
};
