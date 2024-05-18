import { useState, useCallback, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import useRequest from '../hooks/use-request';

const SignUpComponent2 = ({ precheckedData }) => {

    const navigate = useNavigate();

    const inputRef = useRef(null);
    const [errors, setErrors] = useState(null);
    const [passwordInputType, setPasswordInputType] = useState("password");
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        fullname: "",
        password: ""
    });

    const handleChange = useCallback((event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }, [setInputs]);

    const { doRequest } = useRequest({
        url: 'http://localhost:5000/api/users/signup',
        method: 'post',
        body: {
            email: precheckedData.email,
            username: precheckedData.username,
            password: inputs.password,
            fullname: inputs.fullname
        },
        onSuccess: () => {
            setIsLoading(false);
            navigate('/')
        },
        setErrors
    });

    const handleClear = (event) => {
        event.preventDefault();
        setInputs({
            fullname: "",
            password: ""
        });
        setErrors(null);
        inputRef.current.focus();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await doRequest();
        setIsLoading(false);
    }

    return (
        <div className='flex flex-col'>
            {errors ?
                <div className="flex shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl bg-gray-50 text-gray-800 divide-gray-300 mb-4">
                    <div className="flex flex-1 flex-col px-3 py-2 border-l-8 border-red-600">
                        {errors}
                    </div>
                    <button onClick={handleClear} className="px-4 flex items-center text-xs font-medium uppercase text-gray-600 border-gray-300">Clear</button>
                </div> :
                <div className="md:mt-20"></div>
            }
            <form onSubmit={handleSubmit} className='flex flex-col justify-start w-full'>

                <div className='space-y-2'>
                    <div className='flex flex-col space-y-1 font-medium'>
                        <label>Full name *</label>
                        <input
                            name="fullname"
                            id="fullname"
                            type="text"
                            ref={inputRef}
                            value={inputs.fullname || ""}
                            onChange={handleChange}
                            required
                            autoFocus
                            placeholder='Full name...'
                            className='placeholder:italic placeholder:font-normal focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300' />
                    </div>
                    <div className='flex flex-col space-y-1 font-medium'>
                        <label>Password *</label>
                        <div className="flex items-center">
                            <input
                                name="password"
                                id="password"
                                type={passwordInputType}
                                value={inputs.password || ""}
                                onChange={handleChange}
                                required
                                placeholder='Password...'
                                className='placeholder:italic placeholder:font-normal focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent pl-4 pr-12 py-3 text-gray-600 transition duration-300 focus:ring-2 focus:ring-cyan-300' />
                            <div className="-ml-10">
                                {passwordInputType == "password" ?
                                    <svg onClick={() => setPasswordInputType("text")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#595959" className="w-5 h-5 cursor-pointer">
                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                    </svg> :
                                    <svg onClick={() => setPasswordInputType("password")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#595959" className="w-5 h-5 cursor-pointer">
                                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                    </svg>}
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="relative flex my-4 py-3 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-lg before:bg-blue-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
                    <span className="relative flex justify-center items-center space-x-1 text-base font-semibold text-white">
                        {isLoading ?
                            <div className="w-6 h-6 border-2 border-dashed mr-2 rounded-full animate-spin border-white"></div> : null
                        }
                        Sign Up</span>
                </button>
                <p className="font-medium text-center mt-4">Already have an account?<span onClick={() => navigate('/signin')} className="text-blue-700 ml-1 cursor-pointer">Sign in instead</span></p>
            </form>
        </div>
    )
}

export default SignUpComponent2