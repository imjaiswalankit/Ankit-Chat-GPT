import express from "express";
import Thread from "../models/Thread.js";
import getGeminiAPIResponse from "../utils/gemini.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// test
router.post("/test", async(req, res)=>{
    try {
        const thread = new Thread({
            threadId: "xyz",
            title: "Testing our new thread"
        });
          const response = await thread.save();
          res.send(response);
    } catch(err){
        console.log(err);
        res.send(500).json({error: "Failed to save in DB"});
    }
})

//Get all Threads
router.get("/thread",auth, async(req, res)=>{  // browser ya frontend ko req sned kre
    try {
       const threads =  await Thread.find({}).sort({updatedAt: -1});  //db se thread ko fetch krne k liy, thread lane k liy
        // {updatedAt: -1} iiska mtlb h desending order mein update krna 
        //descending order of updatedAt..most recent data on top
        res.json(threads);  
    } catch(err){
       
        console.log(err);
        res.status(500).json({error:"Failed to fetch threads"}); //JavaScript object ke andar key-value pair hona chahiye.
        };
    
    })

// Get ThreadID -> 
router.get("/thread/:threadId",auth, async( req, res)=>{
    const {threadId} = req.params; // aapni threadID ko parameter se fetch krenge 

    try{
        const thread = await Thread.findOne({threadId});

        if(!thread){  // if woo threadId nhi h too 404 status show 
           return res.status(404).json({error:"Thread Not Found"});
        }
        res.json(thread.messages); // if threadID h too uska  show or send krega
    } catch(err){
           console.log(err);
           res.status(500).json({error:"failed to Fetch Chat"});
    }
})

// Del routes

router.delete("/thread/:threadId",auth, async(req, res)=>{
      const {threadId} = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({threadId}) ;
          if(!deletedThread){
           return res.status(404).json({error:"Thread could not be deleted"})
          }
          res.status(200).json({success:"Thread Deleted Successfully"})
    } catch(err){
           console.log(err);
           res.status(500).json({error:"failed to Fetch Deleted Chat"});
    }
})

// Post/Chat route (post request for our chat )

router.post("/chat", auth,  async(req, res)=>{
    const {threadId, message} = req.body;
      
    if(!threadId || !message) {  // check if threadid or msg nhi h too msg send
       return res.status(400).json({error: "Missing Required Filed"});  // ai say yha starting mein return likhna h if code nhi chla too likhna hoga
    }
    try {
        let thread = await Thread.findOne({threadId});  // ai say yha let se start cos const se store ho jayga change nhi hoga

         if(!thread) {    // if thread exist nhi krta too now hum thread create krenge
            // create a new Thread in Db
            thread = new Thread ({
                threadId,
                title: message,
                messages: [{role: "user", content: message}]
            });
         } // if Thread Already h too bss msg ko push krna old chat mein
            else {
                thread.messages.push({role:"user" , content: message});
            }
            // now ask for ai assistant  reply
            const assistantReply = await getGeminiAPIResponse(message);
          
            thread.messages.push({role:"assistant", content:assistantReply}); // reply ko bhi db mein store kara diya 
            thread.updatedAt = new Date();

            await thread.save();
            res.json({reply:assistantReply}); //  reply ko frontend ko send kr diya

    } catch(err){
            console.log(err);
            res.status(500).json({error:"Something went wrong"});
    }
})


export default router;
