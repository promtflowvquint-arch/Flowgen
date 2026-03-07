# FlowGen Frontend - Next.js

Modern Next.js application for FlowGen - AI-powered diagram generator.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Diagram Rendering**: Mermaid.js
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── signup/
│   │   └── page.tsx        # Signup page
│   └── dashboard/
│       └── page.tsx        # Dashboard page
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Sidebar.tsx         # Diagram type selector
│   └── DiagramGenerator.tsx # Main diagram generator
└── public/
    └── logo.svg            # App logo
```

## Features

- ✅ Modern UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Responsive design
- ✅ AI-powered diagram generation
- ✅ Real-time preview
- ✅ Export to PNG/SVG
- ✅ Multiple diagram types support
- ✅ Zoom controls
- ✅ Backend API integration

## Demo Credentials

- **Email**: demo@flowgen.com
- **Password**: demo123

## Environment

Make sure the FastAPI backend is running on `http://localhost:8000`

## License

MIT
