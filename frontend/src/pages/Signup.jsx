import { useState } from "react";
import SignUpComponent2 from "../components/SignUpComponent2";
import SignUpComponent1 from "../components/SignUpComponent1";
import LandingPageWrapper from "../components/LandingPageWrapper";
import SuccessComponent from "../components/SuccessComponent";

const Signup = () => {

    const API_URL = import.meta.env.VITE_API_URL;

    const [validSignup, setValidSignup] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [precheckedData, setPrecheckedData] = useState({
        email: "",
        username: "",
    });

    const signupDiv = isSuccess ? <SuccessComponent successmessage="Registered successfully!" /> : (
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
                    <h2 className="text-4xl font-bold text-gray-900">Sign Up</h2>
                    <p className="text-md font-medium text-slate-700">Please sign up to access all the contents and other privileges.</p>
                </div>
            </div>
            <div className='col-span-1 p-6'>
                {validSignup ? <SignUpComponent2 API_URL={API_URL} precheckedData={precheckedData} setIsSuccess={setIsSuccess} /> : <SignUpComponent1 API_URL={API_URL} setValidSignup={setValidSignup} setPrecheckedData={setPrecheckedData} />}
            </div>
        </div>
    )

    return (
        <LandingPageWrapper>
            {signupDiv}
        </LandingPageWrapper>
    )
}

export default Signup