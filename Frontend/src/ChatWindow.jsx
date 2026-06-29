import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import {PropagateLoader} from "react-spinners";


function ChatWindow(){

    const {prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat} = useContext(MyContext);
    const [loading,setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false); //  jo side mein Account k dropDown h uske liy h

    const getReply = async() =>{
        setLoading(true);
        setNewChat(false);  // jo new Chat likha aa rha woo del ho jayga
        console.log("message", prompt);
        console.log("threadId", currThreadId);
        
        const options = {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                 Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body:JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try{
             const response = await fetch("https://ankit-chat-gpt.onrender.com/api/chat", options);
            const res = await response.json();
             console.log(res);
             setReply(res.reply);
       
       
            }catch(err){
             console.log(err);
        }
        setLoading(false); // jbb ans aagya too loading wala jo img h woo band 
    }

    // Append a new Chat to PrevChat

useEffect (() =>{
    if(prompt && reply) {
        setPrevChats(prevChats =>(
            [...prevChats,{
                role: "user",
                content: prompt
            },{
                role:"assistant",
                content: reply
            }]
        ))
    }
    setPrompt("");
},[reply]);


const handleProfileClick  = () => {
    setIsOpen(!isOpen);
};

// logOut dropDown mein LogOut k liy

const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href="/";
};

   return (
    <div className="chatWindow">

           {/* Navbar */}

        <div className="navbar">
           <span>AnkitGPT &nbsp;<i className="fa-solid fa-chevron-down"></i></span>
             <div className="userIconDiv" onClick={handleProfileClick}>
                <span className="userIcon"><i className="fa-solid fa-user"></i></span>
              </div>
        </div>
        {
            isOpen && 
            <div className="dropDown">
                <div className="dropDownIteam"><i className="fa-solid fa-cloud-arrow-up"></i> Upgrade Plan</div>
                <div className="dropDownIteam"><i className="fa-solid fa-gear"></i> Settings</div>
                <div className="dropDownIteam" onClick={logout}><i class="fa-solid fa-right-from-bracket"></i> Log out</div>

            </div>
        }

        {/* chat which is come by assistant Ai response*/}
        <Chat></Chat>


     {/* loading img create jbb ko msg frontend se send and backend se aane mein jo time lag rhaa too ui dikhega loading ka */}
      
        <PropagateLoader className="loaderContainer" color="#fff" loading={loading}></PropagateLoader>  


         {/* jo user input de rhaa  */}

        <div className="chatInput">

                <div className="inputBox">
                    <input placeholder="Ask anything"
                        value = {prompt}
                        onChange = {(e) =>setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter'? getReply():''}
                        >                   
                     </input>
                       <div id="submit" onClick={getReply}><i className="fa-solid fa-arrow-up-from-bracket"></i></div>
                 </div>

            <p className="info">AnkitGPT can make mistakes.Check important info. See cookie Preferences</p>  
      
      
      
        </div>
  
      </div>
   )
}

export default ChatWindow;