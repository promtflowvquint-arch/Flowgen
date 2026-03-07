import requests
import json

# Test the API
BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    response = requests.get(f"{BASE_URL}/health")
    print("✓ Health Check:", response.json())

def test_types():
    """Test types endpoint"""
    response = requests.get(f"{BASE_URL}/types")
    print("\n✓ Supported Types:", response.json())

def test_generate_flowchart():
    """Test flowchart generation"""
    data = {
        "text": "User logs in, system validates credentials, if valid show dashboard else show error message",
        "type": "flowchart"
    }
    response = requests.post(f"{BASE_URL}/generate", json=data)
    result = response.json()
    print("\n✓ Generated Flowchart:")
    print(result["code"])

def test_generate_sequence():
    """Test sequence diagram generation"""
    data = {
        "text": "User sends login request to server, server validates with database, database returns result, server responds to user",
        "type": "sequence"
    }
    response = requests.post(f"{BASE_URL}/generate", json=data)
    result = response.json()
    print("\n✓ Generated Sequence Diagram:")
    print(result["code"])

def test_generate_mindmap():
    """Test mindmap generation"""
    data = {
        "text": "Project Planning: Requirements, Design, Development, Testing, Deployment",
        "type": "mindmap"
    }
    response = requests.post(f"{BASE_URL}/generate", json=data)
    result = response.json()
    print("\n✓ Generated Mindmap:")
    print(result["code"])

if __name__ == "__main__":
    print("🧪 Testing FlowGen API...\n")
    print("=" * 60)
    
    try:
        test_health()
        test_types()
        test_generate_flowchart()
        test_generate_sequence()
        test_generate_mindmap()
        
        print("\n" + "=" * 60)
        print("✅ All tests passed!")
        
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Cannot connect to API. Make sure the server is running:")
        print("   python main.py")
    except Exception as e:
        print(f"\n❌ Error: {e}")
