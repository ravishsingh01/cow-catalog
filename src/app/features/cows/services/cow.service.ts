import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cow } from '../models/cow.model';
import { generateCowData } from '../data/cows.data';
import { CowFilters } from '../models/cow-filters.model';
import {
  COW_STORAGE_KEY,
  COW_DATA_VERSION,
  COW_VERSION_KEY,
} from 'src/app/core/constants/cow.constants';
@Injectable()
export class CowService {
  private cows$ = new BehaviorSubject<Cow[]>(this.loadCows());

  private loadCows(): Cow[] {
    const version = Number(localStorage.getItem(COW_VERSION_KEY));
    const stored = localStorage.getItem(COW_STORAGE_KEY);

    if (!stored || version !== COW_DATA_VERSION) {
      const seed = generateCowData(30);
      localStorage.setItem(COW_STORAGE_KEY, JSON.stringify(seed));
      localStorage.setItem(COW_VERSION_KEY, String(COW_DATA_VERSION));
      return seed;
    }

    return JSON.parse(stored);
  }

  getPagedCows(
    page: number,
    rows: number,
    filters: CowFilters,
  ): Observable<{ data: Cow[]; total: number }> {
    return this.cows$.pipe(
      map((cows) => {
        const filtered = this.applyFilters(cows, filters);

        const total = filtered.length;
        const start = page * rows;
        const data = filtered.slice(start, start + rows);

        return { data, total };
      }),
    );
  }

  private applyFilters(cows: Cow[], filters: CowFilters): Cow[] {
    return cows.filter((c) => {
      if (filters.search && !this.normalizeId(c.id).includes(this.normalizeId(filters.search))) {
        return false;
      }

      if (filters.status && c.status !== filters.status) {
        return false;
      }

      if (filters.pen && c.pen !== filters.pen) {
        return false;
      }

      return true;
    });
  }

  private normalizeId(id: string): string {
    return id.trim().toUpperCase();
  }

  getCowById(id: string): Cow | undefined {
    const normalizedId = this.normalizeId(id);
    return this.cows$.value.find((c) => this.normalizeId(c.id) === normalizedId);
  }

  addCow(cow: Cow): void {
    const normalizedId = this.normalizeId(cow.id);

    const exists = this.cows$.value.some((c) => this.normalizeId(c.id) === normalizedId);

    if (exists) {
      throw new Error('Cow with this ear tag already exists');
    }

    const normalizedCow = {
      ...cow,
      id: normalizedId,
    };

    const updated = [normalizedCow, ...this.cows$.value];

    localStorage.setItem(COW_STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(COW_VERSION_KEY, String(COW_DATA_VERSION));

    this.cows$.next(updated);
  }
}
