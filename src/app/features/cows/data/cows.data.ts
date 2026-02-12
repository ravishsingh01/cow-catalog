import { Cow } from '../models/cow.model';

// Pure utility function with no side effects.
export function generateCowData(count = 30): Cow[] {
  const cows: Cow[] = [];

  for (let i = 1; i <= count; i++) {
    cows.push({
      id: `COW-${1000 + i}`,
      sex: i % 2 === 0 ? 'MALE' : 'FEMALE',
      pen: `PEN-${(i % 5) + 1}`,
      status:
        i % 7 === 0
          ? 'DECEASED'
          : i % 4 === 0
          ? 'IN_TREATMENT'
          : 'ACTIVE',
      weight: 400 + i * 4,
      lastEventDate: new Date().toISOString()
    });
  }

  return cows;
}
