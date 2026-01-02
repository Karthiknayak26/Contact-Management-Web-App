import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const API_URL = import.meta.env.VITE_API_URL || 'https://contact-management-web-app-mv7c.onrender.com';

function App() {
    const [socket, setSocket] = useState(null);
    const [newContact, setNewContact] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Initialize Socket.IO connection
        const socketInstance = io(API_URL, {
            transports: ['websocket', 'polling'],
        });

        socketInstance.on('connect', () => {
            console.log('✅ Connected to Socket.IO server');
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            console.log('❌ Disconnected from Socket.IO server');
            setIsConnected(false);
        });

        // Listen for new contacts
        socketInstance.on('newContact', (contact) => {
            console.log('📩 New contact received:', contact);
            setNewContact(contact);
        });

        setSocket(socketInstance);

        // Cleanup on unmount
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <div className="container">
            <header className="header">
                <h1>Contact Manager</h1>
                <p>Real-time contact management with MERN Stack + Socket.IO</p>
                <span className="badge">
                    {isConnected ? '🟢 Live Updates Active' : '🔴 Connecting...'}
                </span>
            </header>

            <div className="grid">
                <ContactForm onContactAdded={(contact) => setNewContact(contact)} />
                <ContactList newContact={newContact} />
            </div>

            <footer style={{
                textAlign: 'center',
                padding: '2rem 0',
                color: 'var(--text-muted)',
                fontSize: '0.875rem'
            }}>
                <p>Built with MongoDB, Express.js, React.js, Node.js & Socket.IO</p>
                <p style={{ marginTop: '0.5rem' }}>
                    Interview-ready MERN Stack Project
                </p>
            </footer>
        </div>
    );
}

export default App;
