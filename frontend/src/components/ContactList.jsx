import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ContactList = ({ newContact }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch contacts on component mount
    useEffect(() => {
        fetchContacts();
    }, []);

    // Add new contact when received via Socket.IO
    useEffect(() => {
        if (newContact) {
            // Check if contact already exists to prevent duplicates
            setContacts(prev => {
                const exists = prev.some(contact => contact._id === newContact._id);
                if (exists) {
                    return prev; // Don't add if already exists
                }
                return [newContact, ...prev]; // Add to beginning of list
            });
        }
    }, [newContact]);

    const fetchContacts = async () => {
        try {
            const response = await fetch(`${API_URL}/api/contacts`);
            const data = await response.json();

            if (response.ok) {
                setContacts(data.data || []);
            } else {
                setError(data.message || 'Failed to fetch contacts');
            }
        } catch (err) {
            console.error('Error fetching contacts:', err);
            setError('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="card">
                <h2>Contact List</h2>
                <div className="empty-state">
                    <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
                    <p style={{ marginTop: '1rem' }}>Loading contacts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card">
                <h2>Contact List</h2>
                <div className="error-message">
                    ⚠ {error}
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <h2>Contact List</h2>

            {contacts.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <p>No contacts yet. Add your first contact!</p>
                </div>
            ) : (
                <>
                    <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-md)' }}>
                        Total Contacts: <strong style={{ color: 'var(--primary-light)' }}>{contacts.length}</strong>
                    </p>

                    <div className="contact-list">
                        {contacts.map((contact) => (
                            <div key={contact._id} className="contact-item">
                                <h3>{contact.name}</h3>

                                <div className="contact-info">
                                    <p>
                                        <strong>Email:</strong> {contact.email}
                                    </p>
                                    <p>
                                        <strong>Phone:</strong> {contact.phone}
                                    </p>
                                </div>

                                <div className="contact-message">
                                    <strong style={{ color: 'var(--primary-light)' }}>Message:</strong>
                                    <p style={{ marginTop: '0.5rem' }}>{contact.message}</p>
                                </div>

                                <p className="contact-date">
                                    Submitted: {formatDate(contact.createdAt)}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ContactList;
