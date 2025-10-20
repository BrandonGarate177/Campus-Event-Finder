
class Event
{
    constructor(name, date, location, description, contactinformation)
    {
        this.name = name;
        this.date = date;
        this.location = location;
        this.description = description;
        this.contactinformation = contactinformation;
    
    }

    getName()
    {
        return this.name;

    }

    getDate()
    {
        return this.date;
    }

    getLocation()
    {
        return this.location;
    }

    getDescription()
    {
        return this.description;
    }

    getContactInformation()
    {
        return this.contactinformation;
    }

    getEventDetails()
    {
        return "Event: " + this.name 
        + ", Date: " + this.date
        + ", Location: " + this.location
        + ", Description: " + this.description
        + ", Contact Information: " + this.contactinformation;

    }
}
export {Event};