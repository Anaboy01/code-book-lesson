# LSeven-jsonRpcServer

## Topic
Integrating with a JSON-RPC backend server (matching main-client's server architecture).

## What Changed From Previous Lesson (Lesson 5)
✅ Created **jsonRpcClient.js** — JSON-RPC protocol client  
✅ Updated **productServices.js** — Now calls JSON-RPC server  
✅ Updated **cartService.js** — Now calls JSON-RPC server  
✅ Added Vite proxy config for /rpc endpoint  
✅ Created **jsonRpc-server/** folder with real Node.js server  
✅ Server implements: getProducts, getProductById, searchProducts, getCart, addToCart, removeFromCart, clearCart  

## Key Concepts Introduced
- JSON-RPC 2.0 protocol: Standard for remote procedure calls over JSON
- Client-server communication: Frontend calls backend methods
- Separation of concerns: Server handles data, client renders UI
- Error handling: Try-catch in service layer
- CORS: Cross-Origin Resource Sharing for frontend/backend on different ports

## Why These Changes Were Made
Up to Lesson 6, we used mock data. A real app needs a backend server:
- **Persist data**: Save carts and user info
- **Scalability**: Multiple users with isolated data
- **Security**: Server-side validation
- **Real API**: Matching main-client's server architecture

## What You Should See When You Run This
### Frontend
✓ App looks identical to Lesson 5 with Context API  
✓ Products display (from mock data for now)  
✓ Add to cart works  
✓ Cart count in header updates  

### Server Integration
1. Start the server: `cd jsonRpc-server && npm start`
2. Server listens on http://localhost:4000/rpc  
3. Frontend proxy forwards /rpc requests to server  
4. Open browser DevTools (Network tab) to see JSON-RPC requests and responses  

## How to Run

### Terminal 1 - Frontend
```bash
cd frontend/LSeven-jsonRpcServer
npm install
npm run dev
```

### Terminal 2 - Backend
```bash
cd frontend/jsonRpc-server
npm start
```

Both must run together for the app to work.

## JSON-RPC Protocol Example
**Request:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "getProducts",
  "params": []
}
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [...]
}
```

## Next Steps
This is the final lesson! It demonstrates all core React concepts:
1. ✅ Project structure
2. ✅ Components
3. ✅ Routing
4. ✅ Custom hooks
5. ✅ Context API for state
6. ✅ (Lesson 6 showed Redux alternative)
7. ✅ Server integration

Compare this with `frontend/main-client/` to see the production version with more pages, features, and polish.
