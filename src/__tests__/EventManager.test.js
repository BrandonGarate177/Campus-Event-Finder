import { beforeEach, describe, it, expect } from 'vitest';
import { EventManager } from '../EventManager.js';

beforeEach(() => {
  const store = {};
  global.localStorage = {
    getItem: (k) => store[k] ?? null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); }
  };
});

describe('EventManager', () => {
  it('adds and lists events', () => {
    const eventManager = new EventManager({ useLocalStorage: true });
    const e = eventManager.addEventLoose({
      eventName: 'Career Fair',
      eventDate: '10-20-2025',
      location: 'Student Union',
      contactInformation: 'career@sdsu.edu',
      description: 'Job Opportunities'
    });
    expect(e.id).toBeTruthy();
    const all = eventManager.listEvents();
    expect(all).toHaveLength(1);
    expect(all[0].name).toBe('Career Fair');
    expect(all[0].date).toBe('10-20-2025');
    expect(all[0].location).toBe('Student Union');
    expect(all[0].contactInfo).toBe('career@sdsu.edu');
    expect(all[0].description).toBe('Job Opportunities');
  });

  it('searches text across fields', () => {
    const eventManager = new EventManager({ useLocalStorage: true });
    eventManager.addEventLoose({ eventName: 'Hackathon', eventDate: '10-20-2025', location: 'Library', contactInformation: 'hackathon@sdsu.edu' });
    eventManager.addEventLoose({ eventName: 'Concert', eventDate: '10-20-2025', location: 'Viejas Arena', contactInformation: 'concerts@sdsu.edu' });
    expect(eventManager.searchEvents('Library')).toHaveLength(1);
    expect(eventManager.searchEvents('Concert')).toHaveLength(1);
    expect(eventManager.searchEvents('10-20-2025')).toHaveLength(2);
  });

  it('updates and removes by id', () => {
    const eventManager = new EventManager({ useLocalStorage: true });
    const e = eventManager.addEventLoose({ eventName: 'Planetarium', eventDate: '10-20-2025', location: 'Hepner', contactInformation: 'astronomy@sdsu.edu' });
    const upd = eventManager.updateEventLoose(e.id, { location: 'Storm Hall 12' });
    expect(upd.location).toBe('Storm Hall 12');
    expect(eventManager.removeEvent(e.id)).toBe(true);
    expect(eventManager.getEventById(e.id)).toBeNull();
  });

  it('persists to localStorage', () => {
    const eventManager1 = new EventManager({ useLocalStorage: true });
    eventManager1.addEventLoose({ eventName: 'Career Fair', eventDate: '10-20-2025', location: 'Student Union', contactInformation: 'careers@sdsu.edu' });

    const eventManager2 = new EventManager({ useLocalStorage: true });
    const list = eventManager2.listEvents();
    expect(list).toHaveLength(1);
    expect(list[0].name).toBe('Career Fair');
  });
});