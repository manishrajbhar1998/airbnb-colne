import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const RegisterPage = () => {

  const [user,setUser] = useState({
    name:"",
    email:"",
    password:""
  })

  const hnadleChange = (e) => {
    const {value,name} = e.target;
    setUser(prev => ({
      ...prev,
      [name]:value
    }))
  }

  const hnadleSubmit = async (e) => {
    e.preventDefault();
    try{

      await axios.post("/register",{
        user
      });
      alert("Registration successful. Now you can log in");
    }catch(err){
      alert("Registration failed. Please try again later.",err);
    }
  }
  return (
    <div className='mt-10 flex items-center justify-around'>
      <div>
        <h1 className='text-4xl text-center mb-4'>Rgister</h1>
        <form className='max-w-md mx-auto' onSubmit={hnadleSubmit}>
          <input type="text" placeholder='John Doe' name="name" value={user.name} onChange={hnadleChange} />
          <input type="email" placeholder='your@gmail.com'  name="email" value={user.email} onChange={hnadleChange}/>
          <input type='password' placeholder='password'  name="password" value={user.password} onChange={hnadleChange}/>
          <button className='primary'>Register</button>
          <div className='text-center py-2'>
            Already have an account?
            <Link to="/login" className='underline font-medium'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage