import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ContactForm = ({ onContactAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Client-side validation
    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        // Message validation (optional)
        if (formData.message.trim() && formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSuccessMessage('');

        try {
            const response = await fetch(`${API_URL}/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    phone: formData.phone.replace(/\s/g, '')
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('✓ Contact submitted successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
                setErrors({});

                // Call parent callback if provided
                if (onContactAdded) {
                    onContactAdded(data.data);
                }

                // Clear success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } else {
                // Handle validation errors from backend
                if (data.errors) {
                    const backendErrors = {};
                    data.errors.forEach(err => {
                        backendErrors[err.path || err.param] = err.msg;
                    });
                    setErrors(backendErrors);
                } else {
                    setErrors({ submit: data.message || 'Failed to submit contact' });
                }
            }
        } catch (error) {
            console.error('Error submitting contact:', error);
            setErrors({ submit: 'Network error. Please check your connection.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card">
            <h2>Add New Contact</h2>

            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

            {errors.submit && (
                <div className="error-message">
                    ⚠ {errors.submit}
                </div>
            )}

            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        disabled={isSubmitting}
                    />
                    {errors.name && (
                        <span className="error-message">⚠ {errors.name}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                    />
                    {errors.email && (
                        <span className="error-message">⚠ {errors.email}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="1234567890"
                        disabled={isSubmitting}
                    />
                    {errors.phone && (
                        <span className="error-message">⚠ {errors.phone}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message (optional)</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message (minimum 10 characters)"
                        disabled={isSubmitting}
                    />
                    {errors.message && (
                        <span className="error-message">⚠ {errors.message}</span>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner"></span>
                            <span style={{ marginLeft: '0.5rem' }}>Submitting...</span>
                        </>
                    ) : (
                        'Submit Contact'
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
