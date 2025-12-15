import { useState } from 'react'
import {Admin} from "../Admin.js";
import { EventManager } from "../EventManager.js";
import './ReactAdmin.css';

function ReactAdmin()
{
    const [adminID, setAdminID] = useState("");
    const [ eventName, setEventName] = useState("")
    const [ eventDate, setEventDate] = useState("");
    const [ location, setLocation] = useState("");
    const [ contactInformation, setContactInformation] = useState("");
    const [ message, setMessage] = useState("");
    const [ events, setEvents] = useState ([]);
    const [ isEditing, setIsEditing] = useState(false);
    const [ editIndex, setEditIndex] = useState(null);
    const [ admin, setAdmin] = useState(null);
    const [ isAdminOpen, setIsAdminOpen] = useState (false);

    //admin login
    function handleAdminLogin()
    {
        if(!adminID.trim())
        {
            setMessage("Enter an Admin ID");
            return;
        }

        const newAdmin = new Admin(adminID);
        setAdmin(newAdmin);
        setMessage("Welcome Admin:  " + adminID);

    }


    // admin create
    function handleCreateEvent()
    {
          if (!admin)
        {
            setMessage("Login First");
        }

        if (!eventName || !eventDate || !location || !contactInformation) 
        {
            setMessage("Fill in all text");
            return;

        }

        const newEvent = { eventName, eventDate, location, contactInformation };
       
        if (!window.events)
        {
            window.events = [];
        }

        window.events.push(newEvent);
        setEvents([...window.events]);
        clearFields();
        setMessage("Event Created Successfully.")


    }

    //delete event
    function handleDelete(index)
    {
        const updatedEvents = events.filter((_, i) => i !== index);
        setEvents(updatedEvents);
        setMessage("Event deleted successfully.")
    }

    
    //edit event
    function handleEdit(index)
    {
        const eventEdit = events[index];
        setEventName(eventEdit.eventName);
        setEventDate(eventEdit.eventDate);
        setLocation(eventEdit.location);
        setContactInformation(eventEdit.contactInformation);
        setIsEditing(true);
        setEditIndex(index);

    }

    // save edited event 
    function handleSave()
    {
        const updatedEvents = [...events];
        updatedEvents[editIndex] = { eventName, eventDate, location, contactInformation };
        setEvents(updatedEvents);
        clearFields();
        setIsEditing(false);
        setEditIndex(null);
        setMessage("Event updated successfully.")

    }

    function openAdminPanel()
    {
        if (isAdminOpen) 
        {
            setMessage("Enter Admin ID to continue.")
            return;

        }

        setIsAdminOpen(true);
    }


    function clearFields()
    {
        setEventName("");
        setEventDate("");
        setLocation("");
        setContactInformation("");
        setMessage("");


    }

    

    return (
        <div className="admin-container">
            <h2>Admin Event Manager</h2>

            <input 
                className="admin-input"
                type = "text"
                placeholder = "Admin ID"
                value = {adminID}
                onChange = {(e) => setAdminID(e.target.value)}
            />

            <button className="admin-btn" onClick = {handleAdminLogin}>Login</button>

            {message && <p className="admin-message">{message}</p>} 

            <input
                className="admin-input"
                type = "text"
                placeholder = "Event Name"
                value = {eventName}
                onChange = {(e) => setEventName(e.target.value)}
            />

            <input
                className="admin-input"
                type = "text"
                placeholder = "Event Date"
                value = {eventDate}
                onChange = {(e) => setEventDate(e.target.value)}
            />

            <input
                className="admin-input"
                type = "text"
                placeholder = "Location"
                value = {location}
                onChange = {(e) => setLocation(e.target.value)}
            />

            <input
                className="admin-input"
                type = "text"
                placeholder = "Contact Information"
                value = {contactInformation}
                onChange = {(e) => setContactInformation(e.target.value)}
            />

            {!isEditing  ?(
                <button className="admin-btn" onClick = {handleCreateEvent}>Create Event</button>
            ) : (
                <button className="admin-btn" onClick = {handleSave} > Save Changes</button>
            )}

            
            <hr style={{ margin: "2rem 0", border: "none", borderTop: "1px solid var(--border-color)" }} />

            {events.map(( event, index) => (

                <div key = {index} className="event-item">

                <strong> {event.eventName}</strong>
                <p> Date: {event.eventDate} </p>
                <p> Location: {event.location} </p>
                <p> Contact Information: {event.contactInformation} </p>
                    
                <div className="event-actions">
                    <button className="admin-btn edit-btn" onClick = {() => handleEdit (index)}> Edit </button>
                    <button className="admin-btn delete-btn" onClick = {() => handleDelete (index)}> Delete </button>
                </div>
                </div>

            ))}

        </div>
    );
}
export default ReactAdmin;
