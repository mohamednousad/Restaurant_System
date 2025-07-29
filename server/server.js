// const express = require("express");
// const connectDB = require("./config/database");
// const config = require("./config/config");
// const globalErrorHandler = require("./middlewares/globalErrorHandler");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const app = express();


// const PORT = config.port;
// connectDB();

// // Middlewares
// app.use(cors({
//     credentials: true,
//     origin: ['http://localhost:5173',"https://phyroze-restaurant.vercel.app"]
// }))
// app.use(express.json()); // parse incoming request in json format
// app.use(cookieParser())


// // Root Endpoint
// app.get("/", (req,res) => {
//     res.json({message : "Hello from POS Server!"});
// })

// // Other Endpoints
// app.use("/api/user", require("./routes/userRoute"));
// app.use("/api/order", require("./routes/orderRoute"));
// app.use("/api/table", require("./routes/tableRoute"));
// app.use("/api/payment", require("./routes/paymentRoute"));

// // Global Error Handler
// app.use(globalErrorHandler);


// // Server
// app.listen(PORT, () => {
//     console.log(`☑️  POS Server is listening on port ${PORT}`);
// })

const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const deviceMiddleware = require("./middlewares/deviceMiddleware");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = config.port;

// Connect to DB
connectDB();

// Middlewares
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://192.168.8.181:5173', 'https://phyroze-restaurant.vercel.app']
}));

app.use(express.json());
app.use(cookieParser());

// IP Device Middleware
app.use(deviceMiddleware.deviceTracker);
app.use(deviceMiddleware.errorHandler);

app.get('/admin/devices', (req, res) => {
  res.status(200).json({ devices: deviceMiddleware.getDevices() });
});

app.post('/admin/devices/blockIP', (req, res) => {
  const { ip } = req.body;
  res.status(200).json(deviceMiddleware.blockIP(ip));
});

app.post('/admin/devices/unblockIP', (req, res) => {
  const { ip } = req.body;
  res.status(200).json(deviceMiddleware.unblockIP(ip));
});

// API Routes
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));

// Correct relative path to client/dist
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});
// Error Handler
app.use(globalErrorHandler);

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`☑️ Private Server running at http://localhost:8000:${PORT}`);
    console.log(`☑️ Public Server running at http://192.168.8.181:${PORT}`);
});
