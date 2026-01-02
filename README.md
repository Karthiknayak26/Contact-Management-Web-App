# Contact Manager - MERN Stack + Socket.IO

A production-ready Contact Management Web Application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO for real-time updates.

## 🌐 Live Demo

**Frontend (Vercel)**: https://contact-management-web-app-karthiks-projects-d2b06dcb.vercel.app  
**Backend API (Render)**: https://contact-management-web-app-mv7c.onrender.com  
**GitHub Repository**: https://github.com/Karthiknayak26/Contact-Management-Web-App

## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.IO
- Express-validator

### Frontend
- React.js
- Vite
- Socket.IO Client
- CSS3

## 🚀 Features

- ✅ **Real-time Contact Updates** - Instant updates across all clients using Socket.IO WebSockets
- ✅ **Form Validation** - Client-side and server-side validation
- ✅ **REST API** - GET and POST endpoints for contact management
- ✅ **MongoDB Persistence** - Cloud database with MongoDB Atlas
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **CORS Configured** - Secure cross-origin resource sharing
- ✅ **Clean UI** - Professional, interview-appropriate design

## 🎯 Design Philosophy

### Why Simple CSS?

This project intentionally uses **clean, minimal CSS** instead of fancy animations or complex styling frameworks. Here's why:

**Interview Focus**: The assignment is about demonstrating **MERN stack + Socket.IO skills**, not CSS artistry. A simple, professional UI shows:
- Understanding of the core task requirements
- Focus on functionality over decoration
- Production-ready, maintainable code
- Client-facing business tool aesthetic (not a marketing website)

**Technical Reasoning**:
- No external UI libraries (demonstrates vanilla CSS skills)
- Easy to read and modify
- Fast loading times
- Accessible and professional appearance

The UI resembles an **internal business tool** - which is exactly what a contact management system should look like in a real company.

## 🧠 Challenges & Learnings

MongoDB Atlas Connection
Resolved cloud connection issues by correctly configuring the Atlas URI using environment variables.

CORS Configuration
Adjusted backend CORS settings to allow communication between deployed frontend and backend.

Real-time State Sync
Prevented duplicate UI updates by handling REST and Socket.IO updates carefully.


## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Git

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development

# Start server
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
VITE_API_URL=http://localhost:5000

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📡 API Endpoints

### GET /api/contacts
Fetch all contacts (sorted by newest first)

### POST /api/contacts
Create a new contact

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Optional message"
}
```

## 🔌 Real-time Architecture

```
User submits contact form
        ↓
POST /api/contacts (REST)
        ↓
Save to MongoDB Atlas
        ↓
Emit 'newContact' event (Socket.IO)
        ↓
All connected clients receive update
        ↓
Contact list updates instantly (no page reload)
```

## 🧪 Testing

1. **Form Validation**: Try submitting empty/invalid data
2. **Real-time Updates**: Open app in two browser tabs, submit in one, see instant update in the other
3. **Persistence**: Refresh page - contacts remain (MongoDB)
4. **Responsive**: Test on different screen sizes

## 📦 Deployment

### Backend (Render.com)
- Environment variables configured
- MongoDB Atlas connected
- CORS enabled for frontend

### Frontend (Vercel)
- Automatic deployment from GitHub
- Environment variable: `VITE_API_URL` pointing to Render backend
- Production build optimized

## 💡 Key Learnings

1. **MongoDB Connection Strings**: Always clean Atlas connection strings and avoid deprecated options
2. **CORS Configuration**: Production deployments need flexible CORS settings
3. **Socket.IO Duplicate Prevention**: Always check for duplicates when combining REST + WebSocket updates
4. **Environment Variables**: Never commit `.env` files, always use `.env.example` for documentation
5. **Simple is Better**: For interview assignments, focus on functionality over fancy UI

## 📝 License

MIT

## 👨‍💻 Author

Karthik Nayak  
Built as an interview assignment demonstrating MERN stack + Socket.IO proficiency