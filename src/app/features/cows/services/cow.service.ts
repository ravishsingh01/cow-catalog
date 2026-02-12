import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cow } from '../models/cow.model';
import { generateCowData } from '../data/cows.data';
import { CowFilters } from '../models/cow-filters.model';
@Injectable()
export class CowService {

  private readonly STORAGE_KEY = 'cows';

  private cows$ = new BehaviorSubject<Cow[]>(this.loadCows());

  private loadCows(): Cow[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }

    const seed = generateCowData(30);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }

  getPagedCows(
    page: number,
    rows: number,
    filters: CowFilters
  ): Observable<{ data: Cow[]; total: number }> {

    return this.cows$.pipe(
      map(cows => {
        let filtered = [...cows];

        if (filters.search) {
          filtered = filtered.filter(c =>
            c.id.toString().includes(filters.search!)
          );
        }

        if (filters.status) {
          filtered = filtered.filter(c =>
            c.status === filters.status
          );
        }

        if (filters.pen) {
          filtered = filtered.filter(c =>
            c.pen === filters.pen
          );
        }

        const total = filtered.length;
        const start = page * rows;
        const data = filtered.slice(start, start + rows);

        return { data, total };
      })
    );
  }



  getCowById(id: string): Cow | undefined {
    return this.cows$.value.find(c => c.id === id);
  }

  addCow(cow: Cow): void {
    const exists = this.getCowById(cow.id);
    if (exists) {
      throw new Error('Cow with this ear tag already exists');
    }
    const updated = [cow, ...this.cows$.value];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    this.cows$.next(updated);
  }
}
