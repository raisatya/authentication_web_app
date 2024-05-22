import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const verifyCurrentUser = async () => {
            await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/signout`, {
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