import { Event } from "./Event.js";


const newId = () => String(Date.now() + Math.random());
const trim = v => (typeof v === "string" ? v.trim() : v);

export class EventManager {
  constructor({ useLocalStorage = true } = {}) {
    this.useLocalStorage = useLocalStorage;
    this.events = [];
    this._load();
  }

  _load() {
    if (!this.useLocalStorage) return;
    try {
      const raw = localStorage.getItem("cef_state_v1");
      if (!raw) return;
      const data = JSON.parse(raw);
      const list = Array.isArray(data?.events) ? data.events : [];
      this.events = list.map(e => ({
        id: e.id,
        name: e.name,
        date: e.date,
        location: e.location,
        description: e.description ?? "",
        contactInfo: e.contactInfo ?? ""
      }));
    } catch {}
  }

  _save() {
    if (!this.useLocalStorage) return;
    const payload = {
      events: this.events.map(({ id, name, date, location, description, contactInfo }) => ({
        id, name, date, location, description, contactInfo
      }))
    };
    localStorage.setItem("cef_state_v1", JSON.stringify(payload));
  }

  _normalize(obj = {}) {
    return {
      id: newId(),
      name: trim(obj.name ?? obj.eventName ?? "") || "(Untitled Event)",
      date: trim(obj.date ?? obj.eventDate ?? ""),
      location: trim(obj.location ?? ""),
      description: trim(obj.description ?? ""),
      contactInfo: trim(obj.contactInfo ?? obj.contactInformation ?? "")
    };
  }

  addEventLoose(obj) {
    const rec = this._normalize(obj);
    this.events.push(rec);
    this._save();
    return rec;
  }

  updateEventLoose(id, patch = {}) {
    const i = this.events.findIndex(e => e.id === id);
    if (i === -1) throw new Error("Event not found");
    const cur = this.events[i];
    const upd = {
      ...cur,
      name: trim(patch.name ?? patch.eventName ?? cur.name),
      date: trim(patch.date ?? patch.eventDate ?? cur.date),
      location: trim(patch.location ?? cur.location),
      description: trim(patch.description ?? cur.description),
      contactInfo: trim(patch.contactInfo ?? patch.contactInformation ?? cur.contactInfo)
    };
    this.events[i] = upd;
    this._save();
    return upd;
  }

  removeEvent(id) {
    const before = this.events.length;
    this.events = this.events.filter(e => e.id !== id);
    if (this.events.length < before) this._save();
    return this.events.length < before;
  }

  getEventById(id) {
    return this.events.find(e => e.id === id) ?? null;
  }

  listEvents({ text } = {}) {
    const q = (text ?? "").toLowerCase();
    if (!q) return [...this.events];
    return this.events.filter(e =>
      [e.name, e.date, e.location, e.description, e.contactInfo]
        .some(v => String(v ?? "").toLowerCase().includes(q))
    );
  }

  searchEvents(text) { return this.listEvents({ text }); }
}

export const eventManager = new EventManager();
export default EventManager;