import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/SearchOutlined';
import Card from "../components/Card/Card";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [region, setRegion] = useState('All');

  useEffect(() => {
    filterByRegion(region);
  }, [region]);

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    setCountries(data);
  }

  const filterByRegion = async (region) => {
    if(region === 'All') {
      const res = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await res.json();
      setCountries(data);
    } else {
      const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      const data = await res.json();
      setCountries(data);
    }
  }

  const filterByName = async () => {
    if(searchText.length >= 1) {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${searchText}`);
        const data = await res.json();
        if(data.status === 404) {
          setCountries([]);
          <p>Not Found</p>
        } else {
          setCountries(data)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      filterByRegion(region);
    }
  }

  function handleSearchCountry(e) {
    e.preventDefault();
    filterByName();
  }

  return (
    <div className="h-screen">
      <div className="px-5 md:px-24 py-10 flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-24">
        <form className="relative w-full max-w-lg" onSubmit={handleSearchCountry}>
          <SearchIcon className="absolute top-3 left-4 dark:text-white" />
          {searchText.length >= 1 && countries.length === 0 && <p className="text-rose-400 absolute bottom-12">Not Found</p>}
          <input className="w-full bg-white rounded-lg outline-none py-3 pl-16 px-6 shadow-lg sm:w-full dark:bg-darkModeElements dark:text-white" placeholder="Search for a country" id="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </form>
        <select className="bg-white cursor-pointer shadow-lg outline-none py-3 px-3 rounded-lg w-36 dark:bg-darkModeElements dark:text-white" onChange={(e) => setRegion(e.target.value)}>
          <option>All</option>
          <option>Africa</option>
          <option>Americas</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>Oceania</option>
        </select>
      </div>
      <div className="px-5 md:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-10">
        {countries && countries.map((item, index) => {
          return (
            <Card 
              key={index}
              props={item}
            />
          )
        })}
      </div>
    </div>
  );
}