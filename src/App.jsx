import { useState } from 'react'
import reactLogo from './assets/react.svg'
import ReactUser from './reactUser.jsx'
import ReactEvent from './ReactEvent.jsx'
import ReactAdmin from "./ReactAdmin.jsx"
import './App.css'

function App() {

  const [currentView, setCurrentView] = useState('home');

  

  return (
    <>
      
      <h1> SDSU Campus Event Finder</h1>
          
         


          {/*home page */}
          <div style={{
            marginTop: "20px"
          }}>

            <button onClick = {() => setCurrentView("home")} >Home</button>
            <button onClick = {() => setCurrentView("user")} style ={{ marginLeft: "10px" }}> User Registeration</button>

            <button onClick = {() => setCurrentView("event")} style={{ marginLeft: "10px" }} > Event </button>
            <button onClick = {() => setCurrentView("admin" )} style = {{ marginLeft: "10px"}} > Admin Management</button>
            </div>



          
            {/*page content */}

            <div style = {{ marginTop: "20px" }}> 
              {currentView === "home" && (

                <p style = {{ marginTop: "20px", fontSize: "16px"}}
                ></p>

              )}

              {currentView === "user" && (
                <>
                <ReactUser /> 
                <button onClick = {() => setCurrentView("home")} 
                style = {{ marginTop: "10px"}} >
                  Back to Home
                </button>
                
                </>

              )}

              {currentView === "event" && (

                <>
                <ReactEvent />
                <button onClick = {() => setCurrentView("home")}
                style = {{ marginTop: "10px"}}>
                  Back to Home
                </button>
                </>
              )}

              { currentView === "admin" && (
                <> 
                <ReactAdmin />
                <button onClick = {() => setCurrentView("home")}
                style = {{ marginTop: "10px"}}>
                  Back to Home
                </button>
                
          
                </>
              )}
          </div>
    
    </>
  );
}



export default App

