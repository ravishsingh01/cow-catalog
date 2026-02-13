import { daysAgo } from 'src/app/shared/utils/date.utils';
import { Cow, CowEvent } from '../models/cow.model';
const PEN_VALUES = ['CALVING', 'MILKING', 'HEIFER', 'SICK', 'CALF'] as const;
// Pure function
export function generateCowData(count = 30): Cow[] {
  const cows: Cow[] = [];

  for (let i = 1; i <= count; i++) {
    const cow: Cow = {
      id: `COW-${1000 + i}`,
      sex: i % 2 === 0 ? 'MALE' : 'FEMALE',
      pen: PEN_VALUES[i % PEN_VALUES.length],
      status: i % 7 === 0 ? 'DECEASED' : i % 4 === 0 ? 'IN_TREATMENT' : 'ACTIVE',
      weight: 400 + i * 4,
    };

    cow.events = buildEvents(cow);
    cow.lastEventDate = cow.events[cow.events.length - 1]?.date;

    cows.push(cow);
  }

  return cows;
}

function buildEvents(cow: Cow): CowEvent[] {
  const events: CowEvent[] = [
    {
      type: 'REGISTERED',
      date: daysAgo(20),
      note: 'Cow registered',
    },
  ];

  if (cow.weight) {
    events.push({
      type: 'WEIGHT',
      date: daysAgo(15),
      value: cow.weight - 10,
      note: `Weight check: ${cow.weight - 10} kg`,
    });

    events.push({
      type: 'WEIGHT',
      date: daysAgo(10),
      value: cow.weight,
      note: `Weight check: ${cow.weight} kg`,
    });
  }

  if (cow.status === 'IN_TREATMENT') {
    events.push({
      type: 'TREATMENT',
      date: daysAgo(7),
      note: 'Treatment applied',
    });
  }

  if (cow.status === 'DECEASED') {
    events.push({
      type: 'DECEASED',
      date: daysAgo(0),
      note: 'Cow marked as deceased',
    });
  }

  return events;
}