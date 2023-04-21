import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import Info from '../components/Info/Info';
import { useEffect, useState } from 'react';
import NotFound from '../components/NotFound/NotFound';

export default function Country() {
  const [ borderCountries, setBorderCountries ] = useState(null);
  const [ country, setCountry ] = useState(null);
  const path = useParams().country;

  console.log(country)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (name) => {
      const response = await fetch(`https://restcountries.com/v2/name/${name}?fullText=true`);
      const data = await response.json();

      setCountry(...data);
    }

    fetchData(path)
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

    handleBorderCountries(country);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  return (
    <>
      <div className="px-5 md:px-24 py-10 sm:flex-row sm:justify-between">
        <button className='bg-white flex items-center gap-3 cursor-pointer shadow-lg py-3 px-8 rounded-lg dark:bg-darkModeElements dark:text-white' onClick={() => navigate('/')}>
          <KeyboardBackspaceIcon />
          Back
        </button>
      </div>
      {country ? <div className='px-5 pb-10 md:px-24 flex flex-col gap-10'>
        <img className="w-screen" src={country.flags.png} alt={country.name} />
        <div className='flex flex-col gap-6'>
          <h1 className='font-bold text-2xl'>{country.name}</h1>
          <div className='flex flex-col gap-10'>
            <div>
              {/* <Info name="Native Name" data={country.nativeName} /> */}
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
                  <span onClick={() => navigate(`/${item.name}`)} key={index} className='p-3 bg-white shadow-lg cursor-pointer'>{item.name}</span>
                )
              }) : "This country has no borders"}
            </div>
          </div>
        </div>
      </div> : <NotFound />}
    </>
  )
}