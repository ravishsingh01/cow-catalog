export type CowSex = 'MALE' | 'FEMALE';
export type CowStatus = 'ACTIVE' | 'IN_TREATMENT' | 'DECEASED';

export interface Cow {
  id: string;              // Ear tag
  sex: CowSex;
  pen: string;
  status: CowStatus;
  weight?: number;
  lastEventDate?: string;  // ISO string
}
