import { Cow } from '../../features/cows/models/cow.model';

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
  value: string;
}> = [
  { label: 'Pen-1', value: 'PEN-1' },
  { label: 'Pen-2', value: 'PEN-2' },
  { label: 'Pen-3', value: 'PEN-3' },
  { label: 'Pen-4', value: 'PEN-4' },
  { label: 'Pen-5', value: 'PEN-5' }
];

export const COW_WEIGHT_MIN = 0.1;     // kg
export const COW_WEIGHT_MAX = 1500;    // kg
export const COW_STORAGE_KEY = 'cows';
export const COW_DATA_VERSION = 2;
export const COW_VERSION_KEY = 'cows_version';
