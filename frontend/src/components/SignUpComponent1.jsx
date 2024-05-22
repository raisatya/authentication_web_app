import { useState, useCallback, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import useRequest from '../hooks/use-request';

const SignUpComponent1 = ({ BASE_URL, setValidSignup, setPrecheckedData }) => {

    const navigate = useNavigate();

    const inputRef = useRef(null);
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        username: ""
    });

    const handleChange = useCallback((event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }, [setInputs]);

    const { doRequest } = useRequest({
        url: `${BASE_URL}/api/users/existinguser`,
        method: 'post',
        body: {
            email: inputs.email,
            username: inputs.username,
        },
        onSuccess: () => {
            setIsLoading(false);
            setPrecheckedData({
                email: inputs.email,
                username: inputs.username
            })
            setValidSignup(true);
        },
        setErrors
    });

    const handleClear = (event) => {
        event.preventDefault();
        setInputs({
            username: "",
            email: "",
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
                      <label>Email Id *</label>
                      <input
                          name="email"
                          id="email"
                          type="email"
                          value={inputs.email || ""}
                          onChange={handleChange}
                          ref={inputRef}
                          autoFocus
                          required
                          placeholder='Email id...'
                          className='placeholder:italic placeholder:font-normal focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300' />
                  </div>
                  <div className='flex flex-col space-y-1 font-medium'>
                      <label>Username *</label>
                      <input
                          name="username"
                          id="username"
                          type="text"
                          value={inputs.username || ""}
                          onChange={handleChange}
                          required
                          placeholder='Username...'
                          className='placeholder:italic placeholder:font-normal focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300' />
                  </div>
              </div>
              <button type="submit" className="relative flex my-4 py-3 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-lg before:bg-blue-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
                  <span className="relative flex justify-center items-center space-x-1 text-base font-semibold text-white">
                      {isLoading ?
                          <div className="w-6 h-6 border-2 border-dashed mr-2 rounded-full animate-spin border-white"></div> : null
                      }
                      Continue</span>
              </button>
              <p className="font-medium text-center mt-4">Already have an account?<span onClick={() => navigate('/signin')} className="text-blue-700 ml-1 cursor-pointer">Sign in instead</span></p>
          </form>
        </div>
  )
}

export default SignUpComponent1