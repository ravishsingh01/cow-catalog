import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cow } from '../models/cow.model';
import { generateCowData } from '../data/cows.data';
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

  getPagedCows(page: number, rows: number): Observable<{
    data: Cow[];
    total: number;
  }> {
    return this.cows$.pipe(
      map(cows => {
        const start = page * rows;
        console.log(`Fetching cows for page ${page}, rows ${rows} (start index: ${start}) - Total cows: ${cows.length}`);
        return {
          data: cows.slice(start, start + rows),
          total: cows.length
        };
      })
    );
  }


  getCowById(id: string): Cow | undefined {
    return this.cows$.value.find(c => c.id === id);
  }
}
