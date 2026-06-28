// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });

// const response = await client.responses.create({
//   model: 'gpt-4o-mini',
//   instructions: 'You are a coding assistant that talks like a pirate',
//   input: 'Joke related to Computer Science',
// });

// // console.log(response.output_text);
// console.log(process.env.OPENAI_API_KEY);

// 1st method api call

// import { GoogleGenAI } from "@google/genai";
// import "dotenv/config";

// const client = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// const response = await client.models.generateContent({
//   model: "gemini-2.5-flash",
//   contents: "Joke related to Computer Science",
// });

// console.log(response.text);


// -> 2nd method for api call fetc

import express from 'express';
import "dotenv/config";
import cors from "cors";
import mongoose from 'mongoose';
import chatRoutes from "./routes/chat.js"
console.log("Gemini Key:", process.env.GEMINI_API_KEY);


const app = express();
const PORT = 8080;

app.use(express.json());  // use for pars our incoming request (miiddle ware )frontend se aap fetch ka use karke JSON data bhejte ho, toh server ko wo data samajh nahi aata. Ye line server ko wo data parse (read) karne mein help karti hai. Agar ye line nahi likhoge, toh req.body humesha undefined milega.
app.use(cors());

app.use("/api",chatRoutes);

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


// app.post("/test", async(req, res)=>{
    
//     const {message} = req.body;

//      const options = {
//         method: "POST",
//         headers: {
//             "content-Type" : "application/json",
//             // "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
//         },
//         // body: JSON.stringify({
//         // model: "gemini-2.5-flash",
//         // messages: [{
//         //     role: "user",
//         //     content: "Hello!"
//         // }]
//         // })  
//         // gemini mein meesages k place par contents and parts use hota h
//          body: JSON.stringify({
//           contents: [
//         {
//           parts: [
//             {
//               text: message,
//             },
//           ],
//         },
//       ],
//     }),
//      }

//     try {
//          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, options);
//          const data = await response.json();
//         //  console.log(data);
//         res.send({ reply: data.candidates[0].content.parts[0].text, });       
       
//     } catch(err){
//         console.log(err);
//     }
// })
// console.log(process.env.GEMINI_API_KEY);
