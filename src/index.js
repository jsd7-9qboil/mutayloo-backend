import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
// import middleware
import errorMiddleware from "./middleware/errorMiddleware.js";
// import routes
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import horoscopeRoutes from "./routes/horoscopeRoutes.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5555;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// use routes
app.get("/", (req, res) => {
  res.json({ data: "respond received from the server!" });
});

app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/horoscopes",horoscopeRoutes);

// error handling middleware
app.use(errorMiddleware);

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🍀`);
});
