import { describe, it, expect } from 'vitest';
import { Event } from '../Event.js';

describe('Event X', () => {
  it('getters return', () => {
    const event = new Event('Show', '10-20-2025', 'Hepner Hall', 'music', 'eventmanagement@sdsu.edu');
    expect(event.getName()).toBe('Show');
    expect(event.getDate()).toBe('10-20-2025');
    expect(event.getLocation()).toBe('Hepner Hall');
    expect(event.getDescription()).toBe('music');
    expect(event.getContactInformation()).toBe('eventmanagement@sdsu.edu');
  });

  it('getEventDetails() includes all fields', () => {
    const event = new Event('Concert', '10-20-2025', 'Viejas Arena', 'Music', 'info@sdsu.edu');
    const s = event.getEventDetails();
    expect(s).toContain('Event: Concert');
    expect(s).toContain('Date: 10-20-2025');
    expect(s).toContain('Location: Viejas Arena');
    expect(s).toContain('Description: Music');
    expect(s).toContain('Contact Information: info@sdsu.edu');
  });
});