import Input from "./Input";
import Button from "./Button";
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
    <div className="absolute top-0 z-10 w-full h-screen flex justify-center items-center bg-light p-5">
      <form
        onSubmit={handleSubmit}
        className="w-2xl flex flex-col justify-center items-center gap-6 border-2 p-5 md:p-10 bg-dark rounded-3xl"
      >
        {type == "sign-in" ?(
          <h1 className="text-3xl text-light">Sign In</h1>
        ) : (
          <h1 className="text-3xl text-light">Sign Up</h1>
        )}
        <Input name="username" type="text" placeholder="Username" onChange={handleChange} value={formData.username}></Input>
        {type=="sign-up" && <Input name="email" type="email" placeholder="Email" onChange={handleChange} value={formData.email}></Input>}
        <Input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password}></Input>
        <Button type="submit" text="Submit"></Button>
        {type=="sign-in" ? (
          <Link to="/signup"  className="text-light hover:text-bright">
            Create an account
          </Link>
        ) : (
          <Link to="/signin"  className="text-light hover:text-bright">
            Already have an account?
          </Link>
        )}
      </form>
    </div>
  );
};

export default signup;
