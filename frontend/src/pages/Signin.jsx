import { useState, useCallback, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import useRequest from '../hooks/use-request';
import LandingPageWrapper from "../components/LandingPageWrapper";

const Signin = () => {

  const navigate = useNavigate();

  const inputRef = useRef(null);
  const [errors, setErrors] = useState(null);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const handleChange = useCallback((event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }, [setInputs]);

  const { doRequest } = useRequest({
    url: 'http://localhost:5000/api/users/signin',
    method: 'post',
    body: {
      email: inputs.email,
      password: inputs.password
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
      email: "",
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
    <LandingPageWrapper>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-white max-w-5xl w-full rounded-3xl border shadow p-6'>
        <div className='col-span-1 p-6'>
          <div className='flex justify-start items-center space-x-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>

            <h2 className="text-xl font-semibold text-black">Authentication Web App</h2>
          </div>
          <p className="flex justify-end items-center font-medium italic mt-2">~ Coded with <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="0" stroke="currentColor" className="w-5 h-5 mx-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </span> by Satya Rai</p>
          <div className="space-y-3 px-6 py-2">
            <h2 className="text-4xl font-bold text-gray-900">Sign In</h2>
            <p className="text-md font-medium text-slate-700">Please sign in to access all the contents and other privileges.</p>
          </div>
        </div>
        <div className='col-span-1 flex flex-col p-6'>
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
                <label>Email Id *</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  ref={inputRef}
                  value={inputs.email || ""}
                  onChange={handleChange}
                  required
                  autoFocus
                  placeholder='Email id...'
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
                Sign In</span>
            </button>
            <p className="font-medium text-center mt-4">Don't have an account?<span onClick={() => navigate('/signup')} className="text-blue-700 ml-1 cursor-pointer">Create an account</span></p>
          </form>
        </div>
      </div>
    </LandingPageWrapper>
  )
}

export default Signin