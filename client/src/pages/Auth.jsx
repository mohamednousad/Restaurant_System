import React, { useEffect, useState } from "react";
import restaurant from "../assets/images/restaurant-img.jpg"
import logo from "../assets/images/logo.png"
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Auth = () => {

  useEffect(() => {
    document.title = "POS | Auth"
  }, [])

  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-1/2 relative flex items-center justify-center bg-cover">
        <img className="w-full h-full object-cover" src={restaurant} alt="Restaurant Image" />

        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white">
          "Serve customers the best food with prompt and friendly service in a
          welcoming atmosphere, and they’ll keep coming back"
          <br />
          <span className="block mt-4 text-yellow-400">- Founder of Restro</span>
        </blockquote>
      </div>

      <div className="w-1/2 min-h-screen bg-[#f5f5f5] p-10">
        <div className="flex flex-col items-center gap-2">
          {/* <img src={logo} alt="Restro Logo" className="h-14 w-14 border-2 rounded-full p-1" /> */}
            <svg className="h-8 w-8 text-orange-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
  <path d="M8 7H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M8 11H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M8 15H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <circle cx="17" cy="17" r="1" fill="currentColor"/>
</svg>
          <h1 className="text-lg font-semibold text-[#1a1a1a] tracking-wide">RS-MANAGER</h1>
        </div>

        <h2 className="text-4xl text-center mt-10 font-semibold text-yellow-400 mb-10">
          {isRegister ? "Employee Registration" : "Employee Login"}
        </h2>

        {/* Components */}  
        {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}


        <div className="flex justify-center mt-6">
          <p className="text-sm text-[#ababab]">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <a onClick={() => setIsRegister(!isRegister)} className="text-yellow-400 font-semibold hover:underline" href="#">
              {isRegister ? "Sign in" : "Sign up"}
            </a>
          </p>
        </div>


      </div>
    </div>
  );
};

export default Auth;
