import { useNavigate } from 'react-router-dom';
import errorNotFound from './error-404.svg';

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className='flex justify-center items-center flex-col gap-3 w-auto'>
      <img src={errorNotFound} alt="Not Found" className='w-96'/>
      <button className='bg-white flex items-center gap-3 cursor-pointer shadow-lg py-3 px-8 rounded-lg dark:bg-darkModeElements dark:text-white' onClick={() => navigate('/')}>Back to Home</button>
    </div>
  )
}