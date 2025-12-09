import { useState } from 'react'
import {Admin} from "../Admin.js";
import { EventManager } from "../EventManager.js";

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


        <div

        style={{

            padding: "20px",
            border: "2px solid black",
            width: "340px",
            margin: "40px auto",
            textAlign: "center",
            borderRadius: "10px"



        }}>
            <h2>Admin Event Manager</h2>

            <input 
                type = "text"
                placeholder = "Admin ID"
                value = {adminID}
                onChange = {(e) => setAdminID(e.target.value)}
                
            />

            <br /><br />
            <button onClick = {handleAdminLogin}>Login</button>

            <div style ={{
                height: "25px" , marginBottom: "15px"}}></div>

            {message && <p style ={{ color: "blue", margin: 0 }}>{message}</p>} 

            <>
            
            
            </>

            <input
                type = "text"
                placeholder = "Event Name"
                value = {eventName}
                onChange = {(e) => setEventName(e.target.value)}
            />

            <br /><br />

            <input

                type = "text"
                placeholder = "Event Date"
                value = {eventDate}
                onChange = {(e) => setEventDate(e.target.value)}
            />


            <br /><br />

            <input
                type = "text"
                placeholder = "Location"
                value = {location}
                onChange = {(e) => setLocation(e.target.value)}
            />

            <br /><br />

            <input
                type = "text"
                placeholder = "Contact Information"
                value = {contactInformation}
                onChange = {(e) => setContactInformation(e.target.value)}
            />

            <br /><br />

            {!isEditing  ?(
                <button onClick = {handleCreateEvent}>Create Event</button>
            ) : (
                <button onClick = {handleSave} > Save Changes</button>
            )}

            
            <hr />

            {events.map(( event, index) => (

                <div key = {index} style = {{ marginBottom: "10px", border: "1px solid gray", padding: "10px"}}>

                <strong> {event.eventName}</strong>
                <p> Date: {event.eventDate} </p>
                <p> Location: {event.location} </p>
                <p> Contact Information: {event.contactInformation} </p>
                    
                <button onClick = {() => handleEdit (index)} style = {{ marginRight: "10px"}}> Edit </button>
                <button onClick = {() => handleDelete (index)}> Delete </button>
                </div>

            ))}

        </div>
    );


}
export default ReactAdmin;
