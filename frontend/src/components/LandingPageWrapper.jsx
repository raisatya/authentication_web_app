import { memo } from 'react'
import '../App.css';
import useLazyLoadImage from '../hooks/useLazyLoadImage';

const LandingPageWrapper = ({children}) => {
  const [isVisible, elementRef] = useLazyLoadImage();
        
  return (
    <div ref={elementRef} className={`${isVisible ? `sunrisebg` : `radialbg`} bg-center bg-no-repeat bg-cover bg-fixed flex flex-col justify-center items-center h-screen w-full`}>
      <div className='h-screen backdrop-blur w-full mx-auto my-auto flex flex-col justify-center items-center'>
        {children}
      </div>
    </div>
  )
}

export default memo(LandingPageWrapper)