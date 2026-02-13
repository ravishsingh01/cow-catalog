export type CowSex = 'MALE' | 'FEMALE';
export type CowStatus = 'ACTIVE' | 'IN_TREATMENT' | 'DECEASED';

export interface CowEvent {
  type: 'REGISTERED' | 'WEIGHT' | 'TREATMENT' | 'PEN_CHANGE' | 'DECEASED';
  date: string;
  note?: string;
  value?: number; // for WEIGHT
  fromPen?: string; 
  toPen?: string;
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
