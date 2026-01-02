import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';
import contactRoutes from './routes/contactRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);

// Socket.IO setup with CORS
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make io accessible to routes
app.set('io', io);

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://user:12345@cluster0.q7dka.mongodb.net/contact-manager');
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

connectDB();

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Contact Manager API',
        version: '1.0.0',
        endpoints: {
            contacts: '/api/contacts'
        }
    });
});

app.use('/api/contacts', contactRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Socket.IO ready for real-time updates`);
});
