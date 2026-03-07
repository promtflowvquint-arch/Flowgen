# FlowGen - Complete Setup Guide

## 🚀 Quick Start

### Backend Setup (FastAPI + Gemini AI)

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Add your Gemini API Key**
   - Edit `backend/.env`
   - Add your API key: `GEMINI_API_KEY=your_key_here`
   - Get key from: https://makersuite.google.com/app/apikey

4. **Start the backend server**
   ```bash
   python main.py
   ```
   Backend will run on http://localhost:8000

---

### Frontend Setup (Next.js + TypeScript)

1. **Navigate to frontend folder**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:3000

---

## 📁 Project Structure

```
FlowGen/
├── backend/                 # FastAPI Backend
│   ├── main.py             # API server with Gemini integration
│   ├── requirements.txt    # Python dependencies
│   ├── .env                # Environment variables
│   └── README.md           # Backend documentation
│
├── frontend/               # Next.js Frontend
│   ├── app/                # Next.js app router
│   │   ├── page.tsx        # Home page
│   │   ├── login/          # Login page
│   │   ├── signup/         # Signup page
│   │   └── dashboard/      # Main dashboard
│   ├── components/         # React components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── DiagramGenerator.tsx
│   ├── package.json        # Node dependencies
│   └── README.md           # Frontend documentation
│
└── README.md              # This file
```

## 🎯 Features

### Backend (FastAPI)
- ✅ RESTful API with FastAPI
- ✅ Google Gemini AI integration
- ✅ Mermaid.js code generation
- ✅ CORS enabled
- ✅ 6+ diagram types support
- ✅ Auto-generated API docs

### Frontend (Next.js)
- ✅ Modern React with TypeScript
- ✅ Tailwind CSS styling
- ✅ Responsive design
- ✅ Real-time diagram rendering
- ✅ Export to PNG/SVG
- ✅ Zoom controls
- ✅ Multiple diagram types

## 🔑 Demo Credentials

- **Email**: demo@flowgen.com
- **Password**: demo123

## 📊 Supported Diagram Types

1. **Flowchart** - Flow diagrams and processes
2. **Sequence** - Sequence diagrams for interactions
3. **Mindmap** - Mind maps for brainstorming
4. **ER Diagram** - Entity-relationship diagrams
5. **Class Diagram** - UML class diagrams
6. **State Diagram** - State machine diagrams

## 🛠️ Development

### Backend Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `GET /types` - Supported diagram types
- `POST /generate` - Generate diagram from text
- `GET /docs` - Interactive API documentation

### Frontend Routes

- `/` - Landing page
- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Main diagram generator

## 📝 Usage Example

1. Open http://localhost:3000
2. Click "Login" and use demo credentials
3. In the dashboard, enter text like:
   ```
   User logs in, system validates credentials,
   if valid show dashboard else show error message
   ```
4. Select diagram type (e.g., Flowchart)
5. Click "Generate"
6. AI creates your diagram instantly!

## 🔧 Tech Stack

**Backend:**
- Python 3.10+
- FastAPI
- Google Gemini AI
- Uvicorn
- python-dotenv

**Frontend:**
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Mermaid.js
- Axios
- Lucide Icons

## 🚀 Production Build

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Backend
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

**Made with ❤️ using Next.js, FastAPI, and Gemini AI**
