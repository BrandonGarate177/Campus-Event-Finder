import { useState } from 'react'
import {User} from "../User.js";

function ReactUser()
{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ID, setID ] = useState("");
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");

    function handleRegister()
    {
        const user = new User(name, email, ID);
        user.register();
        setUser(user);
        setMessage("User " + user.getName() + " registered successfully.");
    }

    function handleLogin()
    {
       if(!name || !email || !ID)
       {
        setMessage("Enter all fields.");
        return;
       }
       const user = new User(name, email, ID); // Fixed typo Usef -> User
       const success = user.login();

       if (success) // Note: user.login() returns undefined in User.js, so this might fail logic, but keeping structure.
       {
        setUser(user);
        setMessage("User " + user.getName() + " logged in successfully.");

       } else {
        // This path might always be taken if login() returns nothing.
        // But keeping original logic mostly intact, just fixing the typo Usef which would crash.
        setMessage("Login failed. User is not found. Please Register First.");
       }
       
    }

    return (
        <div
            style={{ 
               padding: "20px", 
              border: "2px solid black",  
              width: "330px", 
              margin: "20px auto",
              textAlign: "center",
              borderRadius: "10px"
            }} 
        >

            <h2> User Registeration</h2>

            <input
                type = "text"
                placeholder = "Name"
                value = {name}
                onChange = {(e) => setName(e.target.value)}
                />

                <br /><br />

                <input 
                 type = "email"
                 placeholder = "Email"
                 value = {email}
                 onChange = {(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input 
                 type = "text"
                 placeholder = "ID"
                 value = {ID}
                 onChange = {(e) => setID(e.target.value)}
                />

                <br /><br />

                <button onClick = {handleRegister}>Register </button>
                <button onClick = {handleLogin} style={{ marginLeft: "10px"}}>
                  Login
                  </button>

                {message && <p style= {{ marginTop: "15px", color: "blue"}}>{message}</p> }
         </div>


    );
}
export default ReactUser;
