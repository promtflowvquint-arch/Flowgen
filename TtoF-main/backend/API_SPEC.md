# Backend Integration Plan for FlowGen

To support the new professional UI and features, the FastAPI backend needs to implement several key endpoints beyond the basic generator. Here is the technical blueprint for your friend.

## 🚀 Core Diagram Engine (Existing)
Already implemented in `main.py`:
- `GET /health`: System check.
- `GET /types`: Supported diagram types.
- `POST /generate`: Generates Mermaid code using Gemini AI.

## 💳 Payment & Subscription Endpoints (Needed)
The frontend currently expect these endpoints at `localhost:8000`:

### 1. Create Payment Order
- **Endpoint**: `POST /payments/create-order`
- **Purpose**: Generates a Razorpay Order ID.
- **Payload**: `{ "amount": number }`
- **Response**: `{ "id": "order_id", "amount": number, "currency": "INR", "key": "razorpay_key" }`

### 2. Verify Payment
- **Endpoint**: `POST /payments/verify`
- **Purpose**: Verifies Razorpay signature and upgrades user tier in DB.
- **Payload**: `{ "razorpay_payment_id": string, "razorpay_order_id": string, "razorpay_signature": string }`
- **Response**: `{ "success": true, "message": "Tier upgraded to Pro" }`

### 3. Check Subscription Status
- **Endpoint**: `GET /payments/status`
- **Purpose**: Returns the current user's access level and prompt count.
- **Auth**: Expects `Authorization: Bearer <token>`.
- **Response**:
```json
{
  "isPaid": boolean,
  "plan": "Pro Engine",
  "expiry": "YYYY-MM-DD",
  "promptsRemaining": number
}
```

## 📂 Project Storage (CRUD) Endpoints (Needed)
The frontend will transition from `localStorage` to these endpoints for diagram persistence:

### 1. Save/Create Project
- **Endpoint**: `POST /projects`
- **Payload**: `{ "title": string, "text": string, "code": string, "type": string }`
- **Response**: `{ "id": "project_uuid", "createdAt": "ISO_DATE" }`

### 2. Fetch All Projects
- **Endpoint**: `GET /projects`
- **Response**: `[ { "id": "uuid", "title": "name", "type": "flowchart", ... }, ... ]`

### 3. Update Project
- **Endpoint**: `PUT /projects/{id}`
- **Payload**: `{ "title": string, "text": string, "code": string }`

### 4. Delete Project
- **Endpoint**: `DELETE /projects/{id}`

## 🛠️ Implementation Guidance
1. **Database**: Use PostgreSQL or MongoDB to track `users`, `tier`, and `prompts_used`.
2. **Authentication**: The frontend is prepared for JWT tokens in the `Authorization` header.
3. **Razorpay**: Use the `razorpay` Python SDK to create orders and verify secret signatures.
4. **CORS**: Ensure `allow_origins=["*"]` is configured (currently is) to allow the Next.js frontend to connect.

---
**Status**: The frontend is ready to connect once these routes are added to `main.py`.
