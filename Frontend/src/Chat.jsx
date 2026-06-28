import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

// chatGpt formet mein answer show hona
// react-MarkDown
//rehype-highlight

function Chat(){

    const {newChat, prevChats, reply} = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    // LAtestReply ko separate kr lenge  and then usmein typing effect showcase krenge frontend mein
    useEffect(()=>{

        // if(!reply) return;
        //  setLatestReply("");

         if(reply === null) {
            setLatestReply(null);  //prevChat is -> null
            return;
         }

        // if(!prevChats?.length) return;  // if prevChat nhi h to uski length return kro

        const content = reply.split(" "); // effect we want use ki jo ai se reply aay woo word by word krke aay iisliy word mein store kr rahe split se
         
        let idx = 0;
        const interval = setInterval(()=>{
            setLatestReply(content.slice(0, idx+1).join(" "));
            idx++;

            if(idx >= content.length) clearInterval(interval); 
        }, 40);

        return () => clearInterval(interval);

   }, [prevChats, reply]) ;   //prevChats, reply ko seprate rakhna h uska mtlb nhi h typing effect se

    return(
        <>
        {newChat && <h1>Start a New Chat!</h1>}
         <div className="chats">
{/* prevchat mei show ki if user se msg too userDiv wala css and sbb use means right side sbb and if ai se reply too gptDiv mein sbb role like sbb left side  */}
            {
                prevChats?.slice(0, -1).map((chat, idx) =>   //slice(0, -1) means last text ko print nhi krenge
                     <div className={chat.role === "user"? "userDiv" : "gptDiv"} key={idx}>
                          {
                            chat.role === "user"? 
                             <p className="userMessage">{chat.content}</p>:
                              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                          }
                     </div>
                )
            }
                     {/* Print for Latest reply */}
             {
                prevChats.length > 0 && latestReply != null &&
                 <div className="gptDiv" key = {"typing"}>
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>    
                 </div>
             }

             {/* last chat ko show karna jbb uss thread tittle ko click kr rhae too prevchat show and then usmein carry the msg */}

                {
                prevChats.length > 0 && latestReply === null &&
                 <div className="gptDiv" key = {"non-typing"}>
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>    
                 </div>
             }


         </div>
        </>
    )
}
export default Chat;