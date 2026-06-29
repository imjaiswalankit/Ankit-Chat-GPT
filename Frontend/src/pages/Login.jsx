import { Link } from "react-router-dom";
import { useState } from "react";
import "../Auth.css";

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e)=>{

    e.preventDefault();

    const response = await fetch("https://ankit-chat-gpt.onrender.com/api/auth/login",{   
          method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();
    

    if(data.token){

        localStorage.setItem("token",data.token);

        localStorage.setItem("user",JSON.stringify(data.user));

        alert("Login Successful");
        
        window.location.href = "/chat";

    }   else{
           alert(data.message);
           }
};


  return (
    <div className="auth-container">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="auth-card">

       <h1 className="logo"><bold>🤖 Ankit Chat~GPT</bold></h1>

        <h2>Welcome Back!!</h2>

        <p className="subtitle">
          Login to continue chatting with AI
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email Address</label>
              <input
                  type="email"
                   placeholder="Enter your email"
                  value={email}
                   onChange={(e) => setEmail(e.target.value)}
              />
          </div>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
                   placeholder="Enter password"  value={password}
                   onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        {/* <p className="bottom-text">
          Don't have an account?
          <span> Sign Up</span>
        </p> */}
        <p className="bottom-text">
              Don't have an account?
              <span onClick={() => window.location.href = "/signup"}>
                    {" "}Sign Up
              </span>
            </p>

      </div>

    </div>
  );
}

export default Login;