import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signout = () => {

    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_ENV == 'production' ? import.meta.env.VITE_PRODUCTION_BASE_URL : import.meta.env.VITE_DEVELOPMENT_BASE_URL;

    useEffect(() => {
        const verifyCurrentUser = async () => {
            await axios.get(`${BASE_URL}/api/users/signout`, {
                withCredentials: true
            });
            navigate("/");
        }
        verifyCurrentUser();
    }, [])
    
  return (
    <div className='flex flex-col bg-gray-100 h-screen w-full justify-center items-center'>Signing out...</div>
  )
}

export default Signout