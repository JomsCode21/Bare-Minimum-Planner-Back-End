import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
// import expressMongoSanitize from "express-mongo-sanitize";

// Database Connection
import "./db"; 

// Custom Middlewares
import { globalErrorHandler } from "./middlewares/global-error-handler.middleware";
import { globalRateLimiter } from "./middlewares/limiter.middleware";

// Route Imports
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const bootstrap = async () => {
  const app = express();
  const PORT = process.env.PORT || 5000;

  // --- Security & Configuration ---
  app.set("trust proxy", 1);
  app.use(helmet());

  // --- CORS Configuration ---
  // This tells the browser: "Allow http://localhost:5173 to send cookies to us"
  app.use(
    cors({
      origin: "http://localhost:5173", // Must match your frontend URL exactly
      credentials: true,               // Critical for cookies to work
    })
  );

  // --- Parsers (Read incoming data) ---
  app.use(express.json());   // Reads JSON body
  app.use(cookieParser());   // Reads Cookies

  // --- Logging & Sanitization ---
  app.use(morgan("dev"));             // Log requests to console
  // app.use(expressMongoSanitize());    // Prevent NoSQL injection
  app.use(globalRateLimiter);         // Limit repeated requests

  // --- Test Route ---
  app.get("/api/test", (req, res) => {
    res.status(200).send("Welcome to hell boss");
  });

  // --- API Routes ---
  app.use("/api/users", userRoutes);
  app.use("/api/tasks", taskRoutes);

  // --- Error Handling ---
  // (Must be the last middleware used)
  app.use(globalErrorHandler);

  // --- Start Server ---
  const server = http.createServer(app);
  server.setTimeout(300000);
  
  server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
  });
};

bootstrap().catch((e) => {
  console.error("Fatal boot error:", e);
  process.exit(1);
});