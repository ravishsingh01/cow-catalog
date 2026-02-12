import { Cow, CowEvent } from '../models/cow.model';

function buildEvents(cow: Cow): CowEvent[] {
  const now = new Date().toISOString();

  const events: CowEvent[] = [
    {
      type: 'REGISTERED',
      date: now,
      note: 'Cow registered'
    }
  ];

  if (cow.weight) {
    events.push({
      type: 'WEIGHT',
      date: now,
      note: `Weight recorded (${cow.weight} kg)`
    });
  }

  if (cow.status !== 'ACTIVE') {
    events.push({
      type: 'STATUS_CHANGE',
      date: now,
      note: `Status changed to ${cow.status}`
    });
  }

  return events;
}

// Pure utility function
export function generateCowData(count = 30): Cow[] {
  const cows: Cow[] = [];

  for (let i = 1; i <= count; i++) {
    const cow: Cow = {
      id: `COW-${1000 + i}`,
      sex: i % 2 === 0 ? 'MALE' : 'FEMALE',
      pen: `PEN-${(i % 5) + 1}`,
      status:
        i % 7 === 0
          ? 'DECEASED'
          : i % 4 === 0
          ? 'IN_TREATMENT'
          : 'ACTIVE',
      weight: 400 + i * 4
    };

    cow.events = buildEvents(cow);

    // lastEventDate ALWAYS from latest event
    cow.lastEventDate =
      cow.events[cow.events.length - 1]?.date;

    cows.push(cow);
  }

  return cows;
}
