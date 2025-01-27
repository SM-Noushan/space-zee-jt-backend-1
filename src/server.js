import app from "./app.js";
import mongoose from "mongoose";
import config from "./app/config/index.js";

let server;

async function main() {
  try {
    await mongoose.connect(config.dbUrl);

    server = app.listen(config.port, () => {
      console.log("Server is running on port:", config.port);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", () => {
  if (server) server.close(() => process.exit(1));
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("Uncaught Exception! Shutting down...");
  process.exit(1);
});
