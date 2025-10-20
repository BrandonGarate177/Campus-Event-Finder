import { describe, it, expect } from 'vitest';
import { Admin } from '../Admin.js';

describe('Admin (current behavior)', () => {
  it('shows create/edit/delete methods', () => {
    const admin = new Admin('A-1');
    expect(typeof admin.createEvent).toBe('function');
    expect(typeof admin.editEvent).toBe('function');
    expect(typeof admin.deleteEvent).toBe('function');
  });

  it('createEvent returns object with Event-like getters', () => {
    const admin = new Admin('A-2');
    const ev = admin.createEvent('Show', '10-20-2025', 'Student Union', 'eventmanagement@sdsu.edu');
    expect(typeof ev.getName).toBe('function');
    expect(typeof ev.getDate).toBe('function');
    expect(typeof ev.getLocation).toBe('function');
    expect(typeof ev.getDescription).toBe('function');
    expect(typeof ev.getContactInformation).toBe('function');
  });

  //can be removed after editEvent logic changed
  it('editEvent currently throws due to undefined vars', () => {
    const admin = new Admin('A-3');
    expect(() => admin.editEvent('Anything', { foo: 'bar' })).toThrow();
  });
});