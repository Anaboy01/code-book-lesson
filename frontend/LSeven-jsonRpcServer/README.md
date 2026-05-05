# LSeven-jsonRpcServer

## Topic
JSON-RPC server integration for a React app.

## What Changed From the Previous Lesson
This lesson replaces the stubbed JSON-RPC helper with a real JSON-RPC endpoint and local server.

### New Files
- `server.js` — local JSON-RPC server implementation.
- `src/utils/rpc.js` — actual JSON-RPC client using fetch.

### Modified Files
- `vite.config.js` — proxy `/rpc` requests to the local JSON-RPC server.
- `src/utils/rpc.js` — switched from stubbed results to network requests.

## Key Concepts Introduced
- JSON-RPC request/response format
- Server proxy configuration in Vite
- Local backend integration for React

## Why These Changes Were Made
A real JSON-RPC backend completes the lesson series by showing how the frontend communicates with a service endpoint.

## How to Run
In one terminal:
```bash
cd frontend/LSeven-jsonRpcServer
npm install
npm run server
```

In another terminal:
```bash
npm start
```

## Reference
See `frontend/main-client/` for the full production version of this feature.
