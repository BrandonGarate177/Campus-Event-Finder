
import { useState } from 'react'
import { Event} from './Event.js'

function ReactEvent()
{
    const [ eventName, setEventName] = useState("");
    const [ eventDate, setEventDate] = useState("");
    const [ location, setLocation] = useState("");
    const [ contactInformation, setContactInformation] = useState("");
    const [message, setMessage] = useState("");

    function handleNewEvent()
    {
        const event = new Event(Date.now(), eventName, eventDate, location, contactInformation);
           console.log(event.getEventDetails());
           setMessage("Event " + event.getName() + " created successfully.");
    
    }
  
 
    return (
        <div
            style ={{
                padding: "20px",
                border: "2px solid black",
                width: "250px",
                margin: "20px auto",
                textAlign: "center",
                borderRadius: "10px"

            }}
        >
            <h2>Add New Event</h2>

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
                    onChange = {(e)  => (setContactInformation(e.target.value))}
                    />

                    <br /><br />

                <button onClick = {handleNewEvent}>Add Event</button>
                
                {message && <p style={{ marginTop: "15px", color: "blue"}}>{message}</p>}

        </div>    
    );
}

export default ReactEvent;