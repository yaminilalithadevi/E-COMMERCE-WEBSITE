// RegistrationForm.js
import React, {  useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './register.css'



function RegistrationForm () {

 const[username,setName]=useState()
 const[email,setEmail]=useState()
 const[password,setPassword]=useState()
 
  const navigate=useNavigate()
     console.log(username,email,password)

useEffect(()=>{
  const auth =localStorage.getItem('user')
  if(auth){
    navigate('/home')
  }
})

 const handleSubmit=(e)=>{
   e.preventDefault()
   if (!username || !email || !password) {
    alert('All fields are required.');
    return;
   }
   axios.post('http://localhost:3001/user/',{username,email,password})
     .then(result=>{console.log(result)

      //localStorage.setItem("user",JSON.stringify(result.data))
      
      
      alert("You Have Succesfully Registered ")
     navigate('/login')
   })
      .catch(err=>console.log(err))
  }



  return (
    <div className='container1'>
    <h2>Register Here</h2>
    <div className='container2'>
    <form >
      <div className='labelname'>
      <label>
        User Name <span style={{ color: 'red' }}>*</span>   
        <input
          type="text"
          name="userName"  required  placeholder='Enter Username'
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      </div>
      <br />

      <label>
        Email  <span style={{ color: 'red' }}>*</span>
        <input
          type="email"
          name="email"  required  placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />

      <label>
        Password  <span style={{ color: 'red' }}>*</span>
        <input
          type="password"
          name="password"  required  placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />

      {/* <Link to='/login'>  </Link> */}
      
      <button type="submit" className='buttons' onClick={handleSubmit} >Register</button>    
     
     </form>
     </div>
      <p >Already have an account?  <Link to="/login">Login</Link> </p>
    
      </div>
  );
  
};

export default RegistrationForm;

 // const [formData, setFormData] = useState({
  //   username:'',
  //   email: '',
  //   password: '',
  // });
  // console.log("formdata",formData);
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add logic to handle form submission (e.g., send data to server)
  //   console.log('Form Submitted:', formData);
  // };
  // console.log("formdata",formData);