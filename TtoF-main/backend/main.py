from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="FlowGen API", description="Text to Diagram Generator API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini AI
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

genai.configure(api_key=GEMINI_API_KEY)

# Diagram type to Mermaid prefix mapping
DIAGRAM_TYPES = {
    "flowchart": "graph TD",
    "sequence": "sequenceDiagram",
    "mindmap": "mindmap",
    "entity-relationship": "erDiagram",
    "class": "classDiagram",
    "state": "stateDiagram-v2",
    "gantt": "gantt",
    "pie": "pie"
}

# Request model
class DiagramRequest(BaseModel):
    text: str
    type: str = "flowchart"

# Response model
class DiagramResponse(BaseModel):
    code: str
    type: str

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "FlowGen API - Text to Diagram Generator",
        "version": "1.0.0",
        "endpoints": {
            "/generate": "POST - Generate diagram from text",
            "/types": "GET - Get supported diagram types"
        }
    }

@app.get("/types")
async def get_diagram_types():
    """Get all supported diagram types"""
    return {
        "supported_types": list(DIAGRAM_TYPES.keys()),
        "default": "flowchart"
    }

@app.post("/generate", response_model=DiagramResponse)
async def generate_diagram(request: DiagramRequest):
    """
    Generate Mermaid.js diagram code from text description
    
    Args:
        text: The text description of the diagram
        type: Type of diagram (flowchart, sequence, mindmap, entity-relationship, etc.)
    
    Returns:
        JSON with generated Mermaid.js code
    """
    try:
        # Validate diagram type
        if request.type not in DIAGRAM_TYPES:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid diagram type. Supported types: {', '.join(DIAGRAM_TYPES.keys())}"
            )
        
        # Get Mermaid prefix for the diagram type1.
        mermaid_prefix = DIAGRAM_TYPES[request.type]
        
        # Initialize Gemini model (Flash 3)
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # System prompt for Mermaid.js generation
        system_instruction = """You are a Mermaid.js expert. Convert user text into valid Mermaid.js code. 
Return ONLY the code. No markdown backticks, no explanations, no additional text.
The code should be clean, properly formatted, and immediately usable in a Mermaid.js renderer.
Follow Mermaid.js syntax strictly."""
        
        # Create the full prompt
        user_prompt = f"""Convert the following text into a {request.type} diagram using Mermaid.js syntax.
Start with '{mermaid_prefix}' and generate valid Mermaid code.

Text: {request.text}

Remember: Return ONLY the Mermaid.js code, no explanations."""
        
        # Generate content with Gemini
        response = model.generate_content(
            f"{system_instruction}\n\n{user_prompt}",
            generation_config={
                "temperature": 0.3,
                "top_p": 0.95,
                "top_k": 40,
                "max_output_tokens": 2048,
            }
        )
        
        # Extract the generated code
        mermaid_code = response.text.strip()
        
        # Clean up any potential markdown formatting
        mermaid_code = mermaid_code.replace("```mermaid", "").replace("```", "").strip()
        
        # Ensure it starts with the correct prefix if not already
        if not mermaid_code.startswith(mermaid_prefix):
            mermaid_code = f"{mermaid_prefix}\n{mermaid_code}"
        
        return DiagramResponse(code=mermaid_code, type=request.type)
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating diagram: {str(e)}"
        )

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "FlowGen API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
