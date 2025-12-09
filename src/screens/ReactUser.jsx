import { useState } from 'react'
import { useAuth } from '../services/authHandler';
import '../Auth.css';

function ReactUser()
{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoginMode, setIsLoginMode] = useState(true);
    
    const { user, signUp, signIn, signOut } = useAuth();

    async function handleAuth() {
        setMessage("");
        if (!email || !password) {
            setMessage("Please enter email and password.");
            return;
        }

        if (isLoginMode) {
            const { error } = await signIn(email, password);
            if (error) setMessage(error.message);
            else setMessage("Logged in successfully!");
        } else {
            const { error } = await signUp(email, password, name);
            if (error) setMessage(error.message);
            else setMessage("Registration successful! Check your email for confirmation.");
        }
    }

    async function handleLogout() {
        const { error } = await signOut();
        if (error) setMessage(error.message);
        else setMessage("Logged out successfully.");
    }

    if (user) {
        return (
            <div className="auth-container">
                <h2>Welcome, {user.email}</h2>
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                {message && <p className="message">{message}</p>}
            </div>
        );
    }

    return (
        <div className="auth-container">

            <h2>{isLoginMode ? "User Login" : "User Registration"}</h2>

            {!isLoginMode && (
                <>
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </>
            )}

            <input 
                className="auth-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                className="auth-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="auth-buttons">
                <button className="btn btn-primary" onClick={handleAuth}>
                    {isLoginMode ? "Login" : "Register"}
                </button>
            </div>
            
            <button 
                onClick={() => setIsLoginMode(!isLoginMode)} 
                className="toggle-auth-mode"
            >
                {isLoginMode ? "Need an account?" : "Already have an account?"}
            </button>

            {message && <p className="message">{message}</p>}
         </div>
    );
}
export default ReactUser;
