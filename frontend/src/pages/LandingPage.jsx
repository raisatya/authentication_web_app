import axios from 'axios';
import { useState, useEffect } from 'react';
import '../App.css';
import WeekDay from '../components/WeekDay';
import LandingPageWrapper from '../components/LandingPageWrapper';
import LogoutComponent from '../components/LogoutComponent';

const LandingPage = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const BASE_URL = import.meta.env.VITE_ENV == 'production' ? import.meta.env.VITE_PRODUCTION_BASE_URL : import.meta.env.VITE_DEVELOPMENT_BASE_URL;
  useEffect(() => {
    const verifyCurrentUser = async () => {
      const { data } = await axios.get(`${BASE_URL}/api/users/currentuser`, {
        withCredentials: true
      });

      if(data)
        setCurrentUser(data.currentUser);
    }

  verifyCurrentUser();
  }, [])
  
  return (
    <LandingPageWrapper>
        <div className='flex flex-col justify-center items-center mx-auto my-auto p-2 sm:p-6 backdrop-blur-2xl bg-stone-300/30 rounded-2xl shadow-lg ring-1 ring-black/5'>
          <div className="text-center mx-2 sm:mx-10 my-6">
          <h1 className="flex justify-center items-center mx-auto max-w-5xl font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-slate-900 lg:text-6xl">{(currentUser === null) ? 'We' : `${currentUser.username}`}
            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="0" stroke="currentColor" className="w-12 h-12 sm:w-20 sm:h-20 mx-1 mt-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            Authentication</h1>
          </div>
          <WeekDay />
          <LogoutComponent currentUser={currentUser}/>
          <p className=''>
          <a href='https://github.com/raisatya/authentication_web_app' className="">
            https://github.com/raisatya/authentication_web_app
            </a>
          </p>
          <p className='font-medium mt-2'>Contact Email: satyanlpid1@gmail.com</p>
        </div>
    </LandingPageWrapper>    
  )
}

export default LandingPage