import {memo, useState, useEffect} from 'react'
import dayjs from 'dayjs';
import '../App.css';

const LandingPageWrapper = ({children}) => {

    const [bgClass, setBgClass] = useState('sunrisebg');
    
    const backgroundClassNames = [
        'sunrisebg',
        'noonbg',
        'sunsetbg',
        'nightbg',
        'midnightbg'
    ]

    const hourValue = dayjs().hour();

    useEffect(() => {
        if (hourValue < 5) setBgClass(backgroundClassNames[4]);
        else if (hourValue >= 5 && hourValue < 11) setBgClass(backgroundClassNames[0]);
        else if (hourValue >= 11 && hourValue < 3) setBgClass(backgroundClassNames[1]);
        else if (hourValue >= 3 && hourValue < 7) setBgClass(backgroundClassNames[2]);
        else setBgClass(backgroundClassNames[3]);

    }, [hourValue])
        
  return (
    <div className={`${bgClass} bg-center bg-no-repeat bg-cover bg-fixed bg-gray-100 flex flex-col justify-center items-center h-screen w-full`}>
      <div className='h-screen backdrop-blur w-full mx-auto my-auto flex flex-col justify-center items-center'>
        {children}
      </div>
    </div>
  )
}

export default memo(LandingPageWrapper)