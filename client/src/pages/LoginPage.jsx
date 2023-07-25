import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const LoginPage = () => {

  const [user,setuser] = useState({
    email:"",
    password:""
  })
  const  {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {value,name} = e.target;
    setuser((prev)=>({
      ...prev,
      [name] : value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {data:{data,token}} = await axios.post("/login",{user});
      console.log(data,token);
      setSessionWithTime("airbndUser",token,10);
      setUser(data)
      navigate('/')
    }catch(err){
      console.error("err ::",err)
      alert("Wrong credentials")
    }
  }
  const setSessionWithTime = (key,value,time) => {
    const currentTime = new Date().getTime();
    const expirationTime = currentTime + time * 1000;
    const sessionObjection = {token:value,expirationTime};
    sessionStorage.setItem(key,JSON.stringify(sessionObjection));
  }

  

  return (
    <div className='mt-10 flex items-center justify-around'>
      <div>
      <h1 className='text-4xl text-center mb-4'>Login</h1>
      <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
        <input type="email" placeholder='your@gmail.com' name="email" value={user.email} onChange={handleChange}/>
        <input type='password' placeholder='password' name="password" value={user.password} onChange={handleChange} />
        <button className='primary'>Login</button>
        <div className='text-center py-2'>
          Don't have an account yet? 
          <Link  to="/register" className='underline font-medium'> Register now</Link>
        </div>
      </form>
      </div>
    </div>
  )
}

export default LoginPage