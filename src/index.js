import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(urlRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app running at: port ${port}`);
});
