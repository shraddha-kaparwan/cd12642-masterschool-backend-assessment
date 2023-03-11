import express from "express";
import dotenv from "dotenv";
dotenv.config();

import photoRoutes from "./routes/photoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectMongo from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import favoritesRoutes from "./routes/favoritesRoutes";

const app = express();
const PORT = process.env.PORT;
connectMongo();

app.use(express.json());
app.use(errorHandler);
app.use(express.urlencoded({ extended: false }));
app.use("/api/photos", photoRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/favoritePhoto", favoritesRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to the Unsplash API!" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
