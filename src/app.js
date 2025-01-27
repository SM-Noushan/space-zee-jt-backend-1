import cors from "cors";
import express from "express";
import router from "./app/routes/index.js";

const app = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5000"],
  })
);

// application routes
app.use("/", router);

app.get("/", async (req, res) => {
  res.send("Space Zee: Backend 1");
});

export default app;
