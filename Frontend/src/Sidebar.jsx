import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import {v1 as uuidv1} from "uuid"; // starting  mein unique threadID create k liy


function Sidebar(){

    const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);
    
    const getAllThreads = async () =>{

      try {
             const response = await fetch("http://localhost:8080/api/thread",{
              headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                      }
});      
        const res = await response.json();
        const filterData = res.map(thread =>({threadId: thread.threadId, title: thread.title}));
        console.log(filterData);
        setAllThreads(filterData);

        //threadId, title

      } catch(err){

      }
    };

    useEffect(()=>{
      getAllThreads();
    },[currThreadId]);

    // newChat Section open k liy

    const createNewChat =() =>{
      setNewChat(true);
      setPrompt(""); //('') string se initate coz user string send krege 
      setReply(null); //(null) se initate coz we dont know ki backend se data kis formet mein aayga so obj bana diya
      setCurrThreadId(uuidv1());
      setPrevChats([]);
    }

    // jo old chat section h usko ope krne k liy and upar functionality work krne k liy 

    const changeThread  = async (newThreadId) =>{
          setCurrThreadId(newThreadId);

          try {
                const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`,{
                headers:{
                             Authorization:`Bearer ${localStorage.getItem("token")}`
                         }
          });          
           const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);

          } catch(err) {
            console.log(err);
          }

    }

    const deleteThread = async (threadId) =>{
          try {
                const response = await fetch(  `http://localhost:8080/api/thread/${threadId}`,
                  {
                     method:"DELETE",
                          headers:{
                                     Authorization:`Bearer ${localStorage.getItem("token")}`
                                  }
                   }
);         
          const res = await response.json();
          console.log(res);

          // updated thread ko re-render
          setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

          //now iff jis thread pr h usko hi del kihya too aab new chat and new thread create ho jya
           if(threadId == currThreadId){
            createNewChat();
           }

          }
          catch(err){
              console.log(err);
          }
    }

    //  Logout button k liy 
    
    const logout=()=>{

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href="/login";

}


    return (

       <section className="sidebar">

          {/* new Chat button */}

            <button onClick={createNewChat}>
              <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
               <span><i className="fa-solid fa-pen-to-square"></i> </span>           
            </button>
            
          {/* history  which are show in form of thread in sidebar*/}

           <ul className="history">
               {
                allThreads?.map((thread, idx) =>(
                  <li key = {idx} onClick={(e) => changeThread(thread.threadId)} 
                     className= {thread.threadId === currThreadId ? "highlighted": " "}
                       >
                    {thread.title} 
                    <i className="fa-solid fa-trash" 
                    onClick={(e) =>{
                       e.stopPropagation(); // for stop event bubbling -> child k effect parent par na ho coz del icon same uss thread mein clash hokar ban rha
                       deleteThread(thread.threadId);
                      } }></i></li>
                ))
               }
           </ul>

          {/* sign, who the app belongs to */}

          <div className="sign">
            <p>By Ankit Jaiswal &hearts;</p>
          </div>
       </section>
    )
}
export default Sidebar;