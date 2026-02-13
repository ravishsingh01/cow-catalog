export type CowSex = 'MALE' | 'FEMALE';
export type CowStatus = 'ACTIVE' | 'IN_TREATMENT' | 'DECEASED';
export type CowPen = 'CALVING' | 'MILKING' | 'HEIFER' | 'SICK' | 'CALF';

export interface CowEvent {
  type: 'REGISTERED' | 'WEIGHT' | 'TREATMENT' | 'PEN_CHANGE' | 'DECEASED';
  date: string;
  note?: string;
  value?: number; // for WEIGHT
  fromPen?: CowPen; 
  toPen?: CowPen;
}

export interface Cow {
  id: string; // Ear tag
  sex: CowSex;
  pen: CowPen;
  status: CowStatus;
  weight?: number;
  lastEventDate?: string; // ISO string
  events?: CowEvent[];
}
