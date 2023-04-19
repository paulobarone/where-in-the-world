import Card from '../components/Card/Card';
import CountriesStorage from '../contexts/CountriesContext';
import { useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import NotFound from '../components/NotFound/NotFound';

export default function Home() {
  const [ searchText, setSearchText ] = useState('');
  const [ region, setRegion ] = useState('All');
  const { allCountries, setAllCountries, countries, setCountries } = useContext(CountriesStorage);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();

      const dataStr = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
      setAllCountries(dataStr);
      setCountries(dataStr);
    }

    fetchData()
      .catch(console.error)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleRegion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region])

  useEffect(() => {
    if(searchText !== '') {
      const filtered = allCountries.filter(({ name }) => {
        const regex = new RegExp(`${searchText}`, "i");
        return name.common.match(regex);
      });
      filtered.length > 0 ? setCountries(filtered) : setCountries(null)
    } else {
      handleRegion()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleRegion = () => {
    if(region === 'All') {
      setCountries(allCountries);
    } else {
      const filtered = allCountries.filter(country => country.region === region);
      setCountries(filtered);
    }
  }

  return (
    <>
      <div>
        {/* <button onClick={() => console.log(countries)} className='bg-white flex items-center gap-3 cursor-pointer shadow-lg py-3 px-8 rounded-lg dark:bg-darkModeElements dark:text-white'>Show Data</button> */}
        <div className="px-5 md:px-24 py-10 flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-24">
          <div className="relative w-full max-w-lg">
            <SearchIcon className="absolute top-3 left-4 dark:text-white" />
            <input className="w-full bg-white rounded-lg outline-none py-3 pl-16 px-6 shadow-lg sm:w-full dark:bg-darkModeElements dark:text-white" placeholder="Search for a country" id="search" autoComplete="off" onChange={(e) => setSearchText(e.target.value)} />
          </div>
          <select className="bg-white cursor-pointer shadow-lg outline-none py-3 px-3 rounded-lg w-36 dark:bg-darkModeElements dark:text-white" onChange={(e) => setRegion(e.target.value)}>
            <option>All</option>
            <option>Africa</option>
            <option>Americas</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>Oceania</option>
          </select>
        </div>
        {searchText && !countries && <NotFound />}
        <div className="px-5 md:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-10">
          {countries && countries.map((item, index) => {
            return <Card 
              key={index}
              props={item}
            />
          })}
        </div>
      </div>
    </>
  );
}