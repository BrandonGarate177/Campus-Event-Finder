import {Event} from "./Event.js";


/**
 * Admin coordinates a local in-memory list of Event objects through an array 
 * and uses create, delete, edit, getEvent
 */
class Admin
{
    constructor(adminID)
    {
        this.adminID = adminID;
        this.events = [];

    }

    createEvent(eventName, eventDate, location, contactInformation)
    {
         const event = new Event(Date.now(), eventName, eventDate, location, contactInformation);
         this.events.push(event);
        console.log("Admin " + this.adminID + " created event: " + event.getName());
        return event;

    }

    deleteEvent(index)
    {
        const event = this.events[index];
       
        if(event)
        {
          
           console.log("Admin " + this.adminID + " deleted event: " + event.eventName);
           this.events.splice(index, 1);
        }
    }

    editEvent(index, newDetails)
    {
        const event = this.events[index];
        if (event)
        {
            event.eventName = newDetails.eventName;
            event.eventDate = newDetails.eventDate;
            event.location = newDetails.location;
            event.contactInformation = newDetails.contactInformation;
            console.log("Event " + event.eventName + " has been updated by Admin " + this.adminID);

        }

       
    }

    getAllEvents()
    {
        return this.events;
    }
}

export {Admin};