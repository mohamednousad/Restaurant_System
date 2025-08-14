const express = require("express");
const config = require("./configs/config");
const connectDB = require("./configs/database");
const deviceMiddleware = require("./middlewares/deviceMiddleware");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

connectDB();

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || config.allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(deviceMiddleware.deviceTracker);
app.use(deviceMiddleware.errorHandler);

app.get("/admin/devices", (req, res) => {
  res.status(200).json({ devices: deviceMiddleware.getDevices() });
});

app.post("/admin/devices/blockIP", (req, res) => {
  const { ip } = req.body;
  res.status(200).json(deviceMiddleware.blockIP(ip));
});

app.post("/admin/devices/unblockIP", (req, res) => {
  const { ip } = req.body;
  res.status(200).json(deviceMiddleware.unblockIP(ip));
});

app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));
app.use("/api/notifications", require("./routes/notifications"));

app.use(globalErrorHandler);

module.exports = app;
