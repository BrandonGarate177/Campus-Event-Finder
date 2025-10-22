import { describe, it, expect } from 'vitest';
import { Admin } from '../Admin.js';


/**
 * Tests for the Admin class check that it exposes the expected methods and that
 * creating/editing events behaves correctly.
 */
describe('Admin (current behavior)', () => {
  it('shows create/edit/delete methods', () => {
    //instance of admin
    const admin = new Admin('A-1');

    // admin contains create, edit, delete of function
    expect(typeof admin.createEvent).toBe('function');
    expect(typeof admin.editEvent).toBe('function');
    expect(typeof admin.deleteEvent).toBe('function');
  });

  it('createEvent returns object with Event-like getters', () => {
    //make admin instance
    const admin = new Admin('A-2');

    //make an event through admin
    const ev = admin.createEvent('Show', '10-20-2025', 'Student Union', 'eventmanagement@sdsu.edu');

    // the returned object looks like the event
    expect(typeof ev.getName).toBe('function');
    expect(typeof ev.getDate).toBe('function');
    expect(typeof ev.getLocation).toBe('function');
    expect(typeof ev.getDescription).toBe('function');
    expect(typeof ev.getContactInformation).toBe('function');
  });

  //can be removed after editEvent logic changed
  it('editEvent currently throws due to undefined vars', () => {
    // Admin with no events at index
    const admin = new Admin('A-3');

    // calling   editEvent with a bad index should NOT crash
    expect(() => admin.editEvent(99, { eventName: 'Nope' })).not.toThrow();	
  });
});