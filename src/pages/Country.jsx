import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import Info from '../components/Info/Info';
import { useEffect, useState } from 'react';
import NotFound from '../components/NotFound/NotFound';
import { LinearProgress } from '@mui/material';

export default function Country() {
  const [ error, setError ] = useState(null);
  const [ borderCountries, setBorderCountries ] = useState(null);
  const [ country, setCountry ] = useState(null);
  const path = useParams().country;

  const navigate = useNavigate();

  const fetchByName = async (name) => {
    try {
      const response = await fetch(`https://restcountries.com/v2/name/${name}?fullText=true`);
      const data = await response.json();

      setCountry(...data);
    } catch(error) {
      setError(error);
    }
  }

  useEffect(() => {

    fetchByName(path)
      .catch(console.error)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleBorderCountries = async (country) => {
      const codeList = country.borders.join();
      const response = await fetch(`https://restcountries.com/v2/alpha?codes=${codeList}`);
      const data = await response.json();

      setBorderCountries(data);
    }

    country && country.borders && handleBorderCountries(country);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  const newCountryData = (name) => {
    fetchByName(name);
    navigate(`/${name}`);
  }

  return (
    <>
    {!country && !error && <LinearProgress />}
      <div className="px-[10%] py-10 sm:flex-row sm:justify-between">
        <button className='bg-white flex items-center gap-3 cursor-pointer shadow-lg py-3 px-8 rounded-lg dark:bg-darkModeElements dark:text-white' onClick={() => navigate('/')}>
          <KeyboardBackspaceIcon />
          Back
        </button>
      </div>
      {country && <div className='px-[10%] pb-10 flex flex-col lg:flex-row gap-10 lg:items-center lg:gap-20'>
        <img className="shadow-lg w-screen lg:w-3/5 lg:h-96 lg:max-w-xl" src={country.flags.png} alt={country.name} />
        <div className='flex flex-col gap-6'>
          <h1 className='font-bold text-2xl dark:text-white'>{country.name}</h1>
          <div className='flex flex-col gap-10'>
            <div>
              <Info name="Native Name" data={country.nativeName} />
              <Info name="Population" data={country.population.toLocaleString()} />
              <Info name="Region" data={country.region} />
              <Info name="Sub Region" data={country.subregion} />
              <Info name="Capital" data={country.capital} />
            </div>
            <div>
              <Info name="Top Level Domain" data={country.topLevelDomain.map((item) => {
                return item
              }).join(', ')} />
              <Info name="Currencies" data={country.currencies.map((item) => {
                return item.name
              }).join(', ')} />
              <Info name="Languages" data={country.languages.map((item) => {
                return item.name
              }).join(', ')} />
            </div>
          </div>
          <div>
            <p className='dark:text-white font-semibold text-xl mb-3'>Border Countries:</p>
            <div className='flex flex-wrap gap-3'>
              {borderCountries ? borderCountries.map((item, index) => {
                return (
                  // ao invés de usar o navigate, seta no state o valor atual
                  <span onClick={() => newCountryData(item.name)} key={index} className='p-3 bg-white dark:bg-darkModeElements dark:text-white shadow-lg cursor-pointer rounded-md'>{item.name}</span>
                )
              }) : <p className='dark:text-gray'>This country has no borders</p>}
            </div>
          </div>
        </div>
      </div>}
      {error && <NotFound />}
    </>
  )
}