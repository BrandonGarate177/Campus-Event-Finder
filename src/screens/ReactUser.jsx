import { useState } from 'react'
import { useAuth } from '../services/authHandler';
import '../Auth.css';
import '../Profile.css';

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
        const displayName = user.user_metadata?.full_name || user.email.split('@')[0];
        const initial = displayName[0].toUpperCase();

        return (
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {initial}
                    </div>
                    <div className="profile-info">
                        <h2>{displayName}</h2>
                        <p className="profile-email">{user.email}</p>
                        
                        <div className="profile-stats">
                            <div className="stat-item">
                                <span className="stat-value">0</span>
                                <span className="stat-label">Events Joined</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">0</span>
                                <span className="stat-label">Events Created</span>
                            </div>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        Sign Out
                    </button>
                </div>

                <div className="profile-content">
                    <div className="content-section">
                        <h3>My Upcoming Events</h3>
                        <div className="empty-state">
                            <p>You haven't joined any events yet.</p>
                        </div>
                    </div>

                    <div className="content-section">
                        <h3>Account Settings</h3>
                        <div className="empty-state" style={{ padding: "1.5rem" }}>
                            <p>Profile settings coming soon.</p>
                        </div>
                    </div>
                </div>
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
