import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LogoutComponent = ({ currentUser }) => {

    const navigate = useNavigate();

    const handleSignout = async (e) => {
        e.preventDefault();
        await axios.get('http://localhost:5000/api/users/signout', {
            withCredentials: true
        });
    }

    const returnedDiv = currentUser == null ? 
        <button onClick={() => { navigate("/signin") }} className="relative flex mt-16 mb-6 py-2 items-center justify-center px-24 before:absolute before:inset-0 before:rounded-full before:bg-blue-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
            <span className="relative flex justify-center items-center space-x-1 text-sm font-semibold text-white">
            Sign In</span>
        </button> : 
        <button onClick={handleSignout} className="relative flex mt-16 mb-6 py-2 items-center justify-center px-24 before:absolute before:inset-0 before:rounded-full before:bg-blue-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
            <span className="relative flex justify-center items-center space-x-1 text-sm font-semibold text-white">
                Sign Out</span>
        </button>

  return returnedDiv;
}

export default LogoutComponent