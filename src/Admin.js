import {Event} from "./Event.js";

export
class Admin
{
    constructor(adminID)
    {
        this.adminID = adminID;

    }

    createEvent(eventName, eventDate, location, contactInformation)
    {
        const event = new Event(Date.now(), eventName, eventDate, location, contactInformation);
        console.log("Admin " + this.adminID + " created event: " + event.getName());
        return event;

    }

    deleteEvent(eventName)
    {
        console.log("Admin " + this.adminID + " deleted event: " + eventName);
    }

    editEvent(eventName, newDetails)
    {
        console.log("Admin " + this.adminID + " edited event: " + eventName + " new date: " + newDate + " new location: " + newLocation);
    }
}