import { CowStatus, CowPen } from './cow.model';

export interface CowFilters {
  search?: string | null;
  status?: CowStatus | null;
  pen?: CowPen | null;
}
