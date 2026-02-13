import { Cow, CowPen } from '../../features/cows/models/cow.model';

//Cow-related domain constants.
export const COW_STATUS_OPTIONS: Array<{
  label: string;
  value: Cow['status'];
}> = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'In Treatment', value: 'IN_TREATMENT' },
  { label: 'Deceased', value: 'DECEASED' }
];

// A cow cannot be created as DECEASED; death is a future event
// and is represented only in historical timeline data.
export const COW_CREATE_STATUS_OPTIONS = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'In Treatment', value: 'IN_TREATMENT' },
];

export const COW_PEN_OPTIONS: Array<{
  label: string;
  value: CowPen;
}> = [
  { label: 'Calving', value: 'CALVING' },
  { label: 'Milking', value: 'MILKING' },
  { label: 'Heifer', value: 'HEIFER' },
  { label: 'Sick', value: 'SICK' },
  { label: 'Calf', value: 'CALF' },
];

export const COW_SEX_OPTIONS: Array<{
  label: string;
  value: Cow['sex'];
}> = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
];


export const COW_WEIGHT_MIN = 0.1;     // kg
export const COW_WEIGHT_MAX = 1500;    // kg
export const COW_STORAGE_KEY = 'cows';
export const COW_DATA_VERSION = 2;
export const COW_VERSION_KEY = 'cows_version';
