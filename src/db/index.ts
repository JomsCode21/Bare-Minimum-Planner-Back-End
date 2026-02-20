import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

/**
 * Database Connection Manager
 *
 * This file handles our connection to MongoDB. We use Mongoose to manage
 * our data models and make it easier to interact with the database.
 */
const dbURI = process.env.MONGO_DB_URI || "mongodb://localhost:27017/todolist";

mongoose
  .connect(dbURI)
  .then(() => {
    // We mask the password in the log for security reasons.
    console.log(
      `Successfully connected to MongoDB at ${dbURI.replace(/:([^:@]+)@/, ":****@")}`,
    );
  })
  .catch((e) => {
    // If the connection fails, we log the error clearly so we can troubleshoot it.
    console.error(
      "Mongoose connection error for URI:",
      dbURI.replace(/:([^:@]+)@/, ":****@"),
    );
    console.error(e.message);
  });
