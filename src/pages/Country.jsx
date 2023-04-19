import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import NotFound from '../components/NotFound/NotFound';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';

export default function Country() {
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchName(location.state.name.common);
  }, [])

  const fetchName = async (name) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    const data = await response.json();
    setCountry(...data);
  }

  return (
    <>
      {!country && <LinearProgress className='absolute top-0 left-0 w-screen' />}
      <div className="px-5 md:px-24 py-10 sm:flex-row sm:justify-between">
        <button className='bg-white flex items-center gap-3 cursor-pointer shadow-lg py-3 px-8 rounded-lg dark:bg-darkModeElements dark:text-white' onClick={() => console.log(country)}>
          <KeyboardBackspaceIcon />
          Back
        </button>
      </div>
      <div className='px-5 md:px-24'>
        {country ? (
          <>
            <img src={country.flags.png} alt={country.name.common} />
            <h2>{country.name.common}</h2>
            <p>Native Name: {country.nativeName}</p>
          </>
        ) : <NotFound />}
      </div>
    </>
  )
}