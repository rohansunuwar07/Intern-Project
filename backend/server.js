import mongoose from "mongoose";
import app from "./app.js";
import connectDb from "./database/connect.js";
import { port } from "./utils/config.js";

// UncaughtException error handling
process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error(`Shutting down the server due to an uncaught exception.`);
    process.exit(1);
}
)
// Start the Server
connectDb();

// Health Checking
app.get('/health', (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is running smoothly!" });
});



// Server checking
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}
)

// Handled unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down the server due to an unhanlded promise rejections");
    server.close(() => {
      process.exit(1);
    }
    );
}
);

// Graceful Shutdown on SIGTERM
process.on("SIGTERM",async () => {
  console.log("SIGTERM received. Closing Server");
  try {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (err) {
    console.error(`Error closing database: ${err.message}`);
  }
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  }
  );
}
);