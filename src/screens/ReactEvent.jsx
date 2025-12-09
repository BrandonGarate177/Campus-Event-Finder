import { useState } from 'react'
import { Event} from '../Event.js'
import { EventManager } from '../EventManager.js' // Fixed import to match export

function ReactEvent()
{
 const [events, setEvents] = useState([]);


    if (events.length === 0 && window.events && window.events.length > 0)
    {
        const allEvents = [];

        for (let i = 0; i < window.events.length; i++)
        {
            const e = window.events[i];
            const newEvent = new Event(e.eventName, e.eventDate, e.location, e.contactInformation);
            allEvents.push(newEvent);
        }

        setEvents(allEvents);
    }

    return (


        <div style = {{


            padding: "20px",
            border: "2px solid black",
            width: "330px",
            margin: " 20px auto",
            textAlign:  "center",
            borderRadius: "10px"

        }}
        >
            <h2> Upcoming Events </h2>


            <br />

            {events.length > 0 ? 
            
               
                events.map(function(event, index)
            
                {
                    return <div key = {index}>

                        <p><b>{event.getName()}</b></p>
                        <p>{event.getDate()}</p>
                        <p>{event.getLocation()}</p>
                        <p>{event.getContactInformation()}</p>
                        
                        <hr />

                    </div>
                        

                })
            : 
                <p> No Events Yet. Come Back Later.</p>
            } 
            

        </div>





    )

}

export default ReactEvent;
