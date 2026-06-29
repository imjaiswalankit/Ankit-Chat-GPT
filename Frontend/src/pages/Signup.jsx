import { Link } from "react-router-dom";
import { useState } from "react";
import "../Auth.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/auth/signup",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            firstName,
            lastName,
            email,
            username,
            password

        })

    });

    const data = await response.json();

    alert(data.message);

    window.location.href="/";  // user signup krega too Login page open ho jayga

}

  return (
    <div className="auth-container">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="auth-card">

        <h1 className="logo">🤖 AJ Chat~GPT</h1>
        <h2>Create your Account</h2>
        <p className="subtitle">Sign up to start chatting with AI</p>

        <form onSubmit={handleSignup}>

          <div className="field-row">
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="Ankit"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Jaiswal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Create Account
          </button>

        </form>

        <p className="terms">
          By signing up you agree to our{" "}
          <span>Terms</span> and <span>Privacy Policy</span>
        </p>

        {/* <p className="bottom-text">
          Already have an account? <span>Login</span>
        </p> */}
         <p className="bottom-text">
               Already have an account?
                     <span onClick={() => window.location.href = "/"}>
                         {" "}Login
                      </span>
          </p>

      </div>
    </div>
  );
}


export default Signup;