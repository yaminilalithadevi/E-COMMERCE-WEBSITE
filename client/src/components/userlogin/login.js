import React,{ useEffect, useState }from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './login.css'
function Login(){
   const[password,setPassword]=useState()
    const[email,setEmail]=useState()

  const navigate= useNavigate()


  useEffect(()=>{
    const auth =localStorage.getItem('user')
    if(auth){
      navigate('/home')
    }

  },[])



const handleSubmit=(e)=>{
    e.preventDefault()
    
    if (!email || !password) {
      alert('All fields are required.');
      return;
    }

      axios.post('http://localhost:3001/user/login',{email,password})
        .then(result=>{console.log(result)
  
          localStorage.setItem("user",JSON.stringify(result))
           navigate('/home')
           console.log("sucess")

  })
  .catch((err) => {
    console.log('Login failed:', err);
    alert('Login failed. Please check your credentials.');
  });
};
//  .catch(err=>console.log(err))
//   }

    return(
        <div className="container1">
           <h1>Login </h1> 

            <form >
            <label>
        Email    <span style={{ color: 'red' }}>*</span>
        <input
          type="email"
          name="email"
          value={email} placeholder="enter email"  required
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />

      <label>
        Password    <span style={{ color: 'red' }}>*</span>
        <input
          type="password"
          name="password"
          value={password}  placeholder="enter password" required
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
{/* 
  <Link to='/home'> </Link> */}
      
      
      <button type="submit"  onClick={handleSubmit}>Login</button> 
            </form>
  <p>Not a member?  <Link to='/register'> Sign Up </Link></p>
        
        </div>
    )

}

export default Login;