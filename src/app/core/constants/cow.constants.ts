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

export const COW_PEN_OPTIONS: Array<{
  label: string;
  value: string;
}> = [
  { label: 'PEN-1', value: 'PEN-1' },
  { label: 'PEN-2', value: 'PEN-2' },
  { label: 'PEN-3', value: 'PEN-3' },
  { label: 'PEN-4', value: 'PEN-4' },
  { label: 'PEN-5', value: 'PEN-5' }
];

export const COW_WEIGHT_MIN = 0.1;     // kg
export const COW_WEIGHT_MAX = 1500;    // kg
