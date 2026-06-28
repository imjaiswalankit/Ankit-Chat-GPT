import "dotenv/config";

const getGeminiAPIResponse = async (message) =>{
     const options = {
        method: "POST",
        headers: {
            "content-Type" : "application/json",
            // "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
        },
        // body: JSON.stringify({
        // model: "gemini-2.5-flash",
        // messages: [{
        //     role: "user",
        //     content: "Hello!"
        // }]
        // })  
        // gemini mein meesages k place par contents and parts use hota h
         body: JSON.stringify({
          contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    }),
     }

    try {
         const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, options);
         const data = await response.json();
        //  console.log(data);
        return data.candidates[0].content.parts[0].text;       
       
    } catch(err){
        console.log(err);
    }
}

export default getGeminiAPIResponse;