export type CowSex = 'MALE' | 'FEMALE';
export type CowStatus = 'ACTIVE' | 'IN_TREATMENT' | 'DECEASED';

export interface CowEvent {
  type: 'REGISTERED' | 'WEIGHT' | 'STATUS_CHANGE';
  date: string;
  note?: string;
}
export interface Cow {
  id: string;              // Ear tag
  sex: CowSex;
  pen: string;
  status: CowStatus;
  weight?: number;
  lastEventDate?: string;  // ISO string
  events?: CowEvent[];
}
