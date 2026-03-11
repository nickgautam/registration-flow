import express from "express";
const app = express();
import "dotenv/config";
import { connectDb } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import helmet from "helmet";
app.use(express.json({ limit: "10kb" }));

app.use(
  cors({
    origin: ["localhost:3000"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Application/json"],
    methods: ["POST", "GET", "DELETE", "PUT"],
  }),
);

app.use(helmet());

await connectDb();

app.use("/user", userRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Express app is running on port ${process.env.PORT || 3000}`);
});
