import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from 'express';
import "dotenv/config";
import cors from "cors";
import mongoose from 'mongoose';

import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

console.log("Gemini Key:", process.env.GEMINI_API_KEY);


const app = express();
const PORT = 8080;

app.use(express.json());  // use for pars our incoming request (miiddle ware )frontend se aap fetch ka use karke JSON data bhejte ho, toh server ko wo data samajh nahi aata. Ye line server ko wo data parse (read) karne mein help karti hai. Agar ye line nahi likhoge, toh req.body humesha undefined milega.
app.use(cors());

// Routes

app.use("/api",chatRoutes);
app.use("/api/auth", authRoutes);

// Database Connection Function

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected With Database!");
  } catch (err) {
    console.log("Failed To connect with Database", err);
  }
};

// jbb bhi hum aapne server ko start kr rhae too jo jo karna h humko woo chiz likha hai
app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
    connectDB();
});
