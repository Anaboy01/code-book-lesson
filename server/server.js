// 



const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const corsOptions = require("./config/corsOption")
const ebookRoute = require("./route/ebookRoute")
const userRoute = require("./route/userRoute")
const cartRoute = require("./route/cartRoute")
const orderRoute = require("./route/orderRoute")


dotenv.config()
// Use 3001 unless PORT is explicitly set in .env
const PORT = process.env.PORT || 3001
const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Logging middleware - log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get("/", (req, res) => {
    res.send("hello Welcome to Codebook Server")
})

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" })
})

app.use("/api/users", userRoute);
app.use("/api/ebook", ebookRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)

// Start server and connect to database
try {
  const server = app.listen(process.env.PORT || PORT, () => {
    const address = server.address();
    console.log(`yoo, we are live on port ${PORT}`)
    console.log(`Server address:`, address)
    console.log(`Server listening on http://localhost:${PORT}`)
    
    // Connect to database after server starts
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log("Connected to Database"))
      .catch((error) => {
        console.log("MongoDB connection error:", error.message)
        console.log("Server will continue running without database connection")
      })
  })

  // Handle server errors
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please stop the other process or use a different port.`)
    } else {
      console.error('Server error:', error)
    }
  })

  // Log when server is ready to accept connections
  server.on('listening', () => {
    const address = server.address();
    console.log(`✅ Server is now listening and ready to accept connections on port ${address.port}`)
  })
} catch (error) {
  console.error('Failed to start server:', error)
  process.exit(1)
}