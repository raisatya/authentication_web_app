import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Signout = () => {

    const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const verifyCurrentUser = async () => {
            await axios.get(`${API_URL}/api/users/signout`, {
                withCredentials: true
            });
            navigate("/", { replace: true });
        }
        verifyCurrentUser();
    }, [])
    
  return (
    <div className='radialbg flex flex-col h-screen w-full justify-center items-center'>Signing out...</div>
  )
}

export default Signout