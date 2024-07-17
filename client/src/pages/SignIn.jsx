import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { signInStart, signInSuccess , signInFailure } from "../redux/user/userSlice";
import {useDispatch , useSelector} from 'react-redux';
import OAuth from "../components/OAuth";

export default function SignIn() {

  const [formData , setFormData] = useState({});
  const {loading , error:errorMessage} = useSelector(state => state.user);
  const dispactch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value.trim()});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if( !formData.email || !formData.password){
      return dispactch(signInFailure('Please fill out all the fields'));
    }
    try {
      dispactch(signInStart());
      const res = await fetch('/api/auth/signin' , {
        method: 'POST',
        headers: {'Content-Type'  : 'application/json'},
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.sucess == false){
        dispactch(signInFailure(data.message));
      }
      
      if(res.ok){
        dispactch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispactch(signInFailure(error.message));
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* //left */}
        <div className="flex-1">
          <Link className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-300 via-purple to-pink-500 rounded-lg text-white">
              McCrea's
            </span>
            blog
          </Link>
          <p className=" text-sm mt-5">
            {" "}
            This is a demo project. You can Sign In with your email and password
            or Google
          </p>
        </div>
        {/* //right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            
            <div className="">
              <Label value="Your email" />
              <TextInput type="email" placeholder="name@company.com" id="email"onChange={handleChange}/>
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput type="password" placeholder="*******" id="password"onChange={handleChange}/>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className="pl-3">Loading...</span>
                  </>
                  
                ) : 'Sign In'
              }
              
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to='/sign-up' className="text-blue-500">Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className="mt-5" color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
