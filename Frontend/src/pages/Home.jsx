import '../App.css';
import Sidebar from '../Sidebar';
import ChatWindow from '../ChatWindow';
import {MyContext} from '../MyContext';
import { useState } from 'react';
import {v1 as uuidv1} from "uuid"; // starting  mein unique threadID create k liy
import { Navigate } from "react-router-dom";

// app.jsx se jbb idhr code aaya too Home function hua app k place pr

function Home() {

      const token = localStorage.getItem("token");
      
      if (!token) {
           return <Navigate to="/" />;
         }

  const [prompt, setPrompt] = useState("") // prompt - msg from user joo initaial mein empty string h
  const [reply, setReply] = useState(null); // jo backend se reply aayga
  const [currThreadId, setCurrThreadId] = useState(uuidv1()); //threadID create k liy jo chatWindow mein submit button click k liy use hoga
  const [prevChats, setPrevChats] = useState([]); // store all chats of currThreads
  const [newChat, setNewChat] = useState(true);;
  const [allThreads, setAllThreads] = useState([]);

  // Passing Values
  const providerValues = {
    prompt, setPrompt,
    reply,setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  }; 


  return (
    <>
    <div className='app'>
      <MyContext.Provider value={providerValues}>
         <Sidebar></Sidebar>
         <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>

    </>
  )
  
};

// export default App;
export default Home;
