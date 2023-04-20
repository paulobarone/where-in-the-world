import SearchIcon from '@mui/icons-material/SearchOutlined';
import { useContext, useEffect, useState } from 'react';
import CountriesStorage from '../../contexts/CountriesContext';

export default function Search() {
  const [ searchText, setSearchText ] = useState('');
  const { allCountries, setCountries } = useContext(CountriesStorage);
  console.log(allCountries)
  
  useEffect(() => {
    if(searchText !== '') {
      const filtered = allCountries.filter(({ name }) => {
        const regex = new RegExp(`${searchText}`, "i");
        return name.match(regex);
      });
      filtered.length > 0 ? setCountries(filtered) : setCountries(null)
    } else {
      setCountries(allCountries)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, allCountries])

  return (
    <div className="relative w-full max-w-lg">
      <SearchIcon className="absolute top-3 left-4 dark:text-white" />
      <input className="w-full bg-white rounded-lg outline-none py-3 pl-16 px-6 shadow-lg sm:w-full dark:bg-darkModeElements dark:text-white" placeholder="Search for a country" id="search" autoComplete="off" onChange={(e) => setSearchText(e.target.value)} />
    </div>
  )
}