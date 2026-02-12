import { Cow } from "./cow.model";

export interface CowFilters {
  search?: string | null;
  status?: Cow['status'] | null;
  pen?: string | null;
}

