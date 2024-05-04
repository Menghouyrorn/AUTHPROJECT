import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';


const Signin = () => {
  const [formData,setFormData]=useState({});
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }

  // console.log(formData);

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data =await res.json();
      // console.log(data);
      setLoading(false);
      // setError(false);
      if(data.success === false){
        setError(true);
        return;
      }
      navigate('/')
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-extrabold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={handleChange} type='email' placeholder='Email' id='eamil' className='bg-slate-100 p-3 rounded-lg' />
        <input onChange={handleChange} type='password' placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg' />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80
        '>{loading ? 'Loading...':'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>dont has a account ? </p>
        <Link to={'/sign-up'}>
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-700'>{error && 'Something went rong'}</p>
    </div>
  )
}

export default Signin