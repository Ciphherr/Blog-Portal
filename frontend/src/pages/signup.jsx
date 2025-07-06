import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useAuth } from "../Context/authContext";

const signup = ({type}) => {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name] : e.target.value,
    }));
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    try{
      const endpoint = type == "sign-up"?"http://localhost:3000/users/register":"http://localhost:3000/users/login";
      const payload = type == "sign-up"?formData: {username:formData.username, password:formData.password};

      const response = await axios.post(endpoint, payload, { withCredentials: true });

      setFormData({
        username: "",
        email: "",
        password: ""
      });

      if (type === "sign-in") {
        await checkAuth();
      }

      navigate("/");

    }
    catch(err){
      console.log("error is :", err.response.data);
      alert("something went wrong");
    }
  }

  return (
    <div className="absolute top-0 z-10 w-full h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark to-dark-light">
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-20 w-24 h-24 bg-bright/20 rotate-45 animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-bright/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-light/10 rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-gradient-to-r from-bright/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-l from-light/10 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left side */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-light leading-tight">
              Welcome to the
              <span className="block text-bright animate-pulse">Blogging Webserver</span>
            </h2>
            <p className="text-light/70 text-lg max-w-md mx-auto">
              Join thousands of users who trust our platform for their digital journey.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Glass morphism form container */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-bright/50 to-bright/20 rounded-2xl blur-xl animate-pulse"></div>
              
              <form
                onSubmit={handleSubmit}
                className="relative bg-dark/80 backdrop-blur-xl border border-bright/30 rounded-2xl p-8 space-y-6 shadow-2xl"
              >
                <div className="text-center space-y-4">
                  <h1 className="text-3xl font-bold text-light">
                    {type == "sign-in" ? "Welcome Back" : "Create Account"}
                  </h1>
                  <p className="text-light/60">
                    {type == "sign-in" ? "Sign in to your account" : "Join our community today"}
                  </p>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <Input 
                      name="username" 
                      type="text" 
                      placeholder="Username" 
                      onChange={handleChange} 
                      value={formData.username}
                    />
                  </div>
                  
                  {type=="sign-up" && (
                    <div className="transform hover:scale-105 transition-transform duration-200">
                      <Input 
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        onChange={handleChange} 
                        value={formData.email}
                      />
                    </div>
                  )}
                  
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <Input 
                      name="password" 
                      type="password" 
                      placeholder="Password" 
                      onChange={handleChange} 
                      value={formData.password}
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <Button type="submit" text={type == "sign-in" ? "Sign In" : "Create Account"} />
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-light/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-dark/80 text-light/60">or</span>
                  </div>
                </div>

                {/* Toggle link */}
                <div className="text-center">
                  {type=="sign-in" ? (
                    <Link 
                      to="/signup" 
                      className="text-light/80 hover:text-bright transition-colors duration-200 flex items-center justify-center space-x-2 group"
                    >
                      <span>Don't have an account?</span>
                      <span className="font-semibold group-hover:translate-x-1 transition-transform duration-200">
                        Sign up →
                      </span>
                    </Link>
                  ) : (
                    <Link 
                      to="/signin" 
                      className="text-light/80 hover:text-bright transition-colors duration-200 flex items-center justify-center space-x-2 group"
                    >
                      <span>Already have an account?</span>
                      <span className="font-semibold group-hover:translate-x-1 transition-transform duration-200">
                        Sign in →
                      </span>
                    </Link>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;