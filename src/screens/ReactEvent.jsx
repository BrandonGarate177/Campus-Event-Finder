import { useState, useEffect } from 'react';
import { getEvents, toggleRegistration } from '../services/functionHandler';
import './ReactEvent.css';

// Import images
import AztecBasketball from '../assets/events/AztecBasketball.jpeg';
import AztecWomensBasketball from '../assets/events/AztecWomensBasketball.webp';
import AztecWomensBasketballTWO from '../assets/events/AztecWomensBasketballTWO.webp';
import CompSciClub from '../assets/events/CompSciClub.jpg';
import DropInAdvising from '../assets/events/DropInAdvising.jpg';
import DuranDuran from '../assets/events/DuranDuran.webp';
import InternationalAdvising from '../assets/events/InternationalAdvising.jpg';
import StudyAbroad from '../assets/events/StudyAbroad.jpg';
import TalkItOut from '../assets/events/talkItOut.png';
import Thomasites from '../assets/events/thomasitesInThePhilippines.jpeg';

const getEventImage = (title) => {
    if (!title) return AztecBasketball;
    const t = title.toLowerCase();
    if (t.includes('women') && t.includes('basketball')) return Math.random() > 0.5 ? AztecWomensBasketball : AztecWomensBasketballTWO;
    if (t.includes('basketball')) return AztecBasketball;
    if (t.includes('computer') || t.includes('science') || t.includes('club')) return CompSciClub;
    if (t.includes('drop-in') || t.includes('advising')) return DropInAdvising;
    if (t.includes('duran')) return DuranDuran;
    if (t.includes('international')) return InternationalAdvising;
    if (t.includes('study abroad')) return StudyAbroad;
    if (t.includes('talk')) return TalkItOut;
    if (t.includes('philippines') || t.includes('thomasites')) return Thomasites;
    
    // Return a random image if no match
    const images = [AztecBasketball, CompSciClub, DropInAdvising, StudyAbroad, TalkItOut];
    return images[Math.floor(Math.random() * images.length)];
};

function ReactEvent() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [registeringId, setRegisteringId] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const { data, error } = await getEvents();
            
            if (error) throw error;
            
            // Handle case where data might be null or wrapped
            setEvents(data || []);
        } catch (err) {
            console.error('Error fetching events:', err);
            setError('Failed to load events. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleRegistration = async (eventId) => {
        try {
            setRegisteringId(eventId);
            const { data, error } = await toggleRegistration(eventId);
            
            if (error) throw error;

            // Optimistically update the UI or refetch
            // Assuming the API returns the updated registration status or we just toggle it locally
            // For now, let's refetch to be safe and ensure we have the latest state
            await fetchEvents();
            
        } catch (err) {
            console.error('Error toggling registration:', err);
            alert('Failed to update registration. Please try again.');
        } finally {
            setRegisteringId(null);
        }
    };

    if (loading) {
        return (
            <div className="event-container">
                <div className="loading-state">
                    <h2>Loading events...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="event-container">
                <div className="error-state">
                    <h2>Oops!</h2>
                    <p>{error}</p>
                    <button onClick={fetchEvents} className="register-btn" style={{maxWidth: '200px', marginTop: '1rem'}}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="event-container">
            <div className="event-header">
                <h2>Upcoming Events</h2>
                <p>Join us for these exciting community activities</p>
            </div>

            {events.length > 0 ? (
                <div className="event-grid">
                    {events.map((event) => (
                        <div key={event.id} className="event-card">
                            <div className="event-image">
                                <img 
                                    src={getEventImage(event.title)} 
                                    alt={event.title} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="event-content">
                                <div className="event-date">
                                    {new Date(event.start_time).toLocaleDateString(undefined, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                                <h3 className="event-title">{event.title}</h3>
                                
                                <p className="event-description">
                                    {event.description || "No description available."}
                                </p>

                                <div className="event-actions">
                                    <button 
                                        className={`register-btn ${event.is_registered ? 'registered' : ''}`}
                                        onClick={() => handleToggleRegistration(event.id)}
                                        disabled={registeringId === event.id}
                                    >
                                        {registeringId === event.id ? 'Processing...' : 
                                         event.is_registered ? 'Registered ✓' : 'Register Now'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <h3>No events found</h3>
                    <p>Check back later for upcoming events!</p>
                </div>
            )}
        </div>
    );
}

export default ReactEvent;
