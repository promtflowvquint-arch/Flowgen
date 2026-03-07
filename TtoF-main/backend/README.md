# FlowGen Backend API

FastAPI backend for converting text descriptions to Mermaid.js diagrams using Google Gemini AI.

## Features

- 🚀 Fast API with automatic documentation
- 🤖 Powered by Google Gemini 1.5 Flash
- 📊 Supports multiple diagram types (flowchart, sequence, mindmap, ER, etc.)
- 🔄 CORS enabled for frontend integration
- 📝 Clean Mermaid.js code generation

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_api_key_here
```

**Get your API key:** https://makersuite.google.com/app/apikey

### 3. Run the Server

```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

## API Documentation

Interactive API docs available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Endpoints

### POST `/generate`

Generate a Mermaid.js diagram from text.

**Request Body:**
```json
{
  "text": "User logs in, validates credentials, shows dashboard",
  "type": "flowchart"
}
```

**Response:**
```json
{
  "code": "graph TD\n  A[User Login] --> B[Validate Credentials]\n  B --> C[Show Dashboard]",
  "type": "flowchart"
}
```

### GET `/types`

Get all supported diagram types.

**Response:**
```json
{
  "supported_types": ["flowchart", "sequence", "mindmap", "entity-relationship", "class", "state", "gantt", "pie"],
  "default": "flowchart"
}
```

## Supported Diagram Types

- `flowchart` - Flowcharts and flow diagrams
- `sequence` - Sequence diagrams
- `mindmap` - Mind maps
- `entity-relationship` - ER diagrams
- `class` - Class diagrams
- `state` - State diagrams
- `gantt` - Gantt charts
- `pie` - Pie charts

## Example Usage

### Using cURL

```bash
curl -X POST "http://localhost:8000/generate" \
  -H "Content-Type: application/json" \
  -d '{"text": "Start, login, check credentials, if valid go to dashboard else show error", "type": "flowchart"}'
```

### Using Python

```python
import requests

response = requests.post(
    "http://localhost:8000/generate",
    json={
        "text": "User registration process with validation",
        "type": "flowchart"
    }
)

result = response.json()
print(result["code"])
```

### Using JavaScript

```javascript
fetch('http://localhost:8000/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'Login flow with authentication',
    type: 'flowchart'
  })
})
.then(response => response.json())
.then(data => console.log(data.code));
```

## Production Deployment

For production, update CORS settings in `main.py`:

```python
allow_origins=["https://yourdomain.com"]  # Replace * with your domain
```

## License

MIT
