import { useNavigate } from "react-router-dom";

export default function Card({props}) {

  const navigate = useNavigate();

  function redirectCountry(country) {
    navigate(`/${country.name.common}`, { state: country });
  }

  return (
    <div className="rounded-lg bg-white cursor-pointer flex flex-col max-w-[280px] xl:max-w-[300px] shadow-lg dark:bg-darkModeElements" onClick={() => redirectCountry(props)}>
      <img src={props.flags.png} alt={props.name.common} className="rounded-t-lg w-[280px] xl:w-[300px] h-48" />
      <div className='flex flex-col gap-0.5 px-4 py-6'>
        <h3 className='mb-3 text-xl font-bold dark:text-white'>{props.name.common}</h3>
        <p className="dark:text-white">Population: <span className="dark:text-gray">{(props.population).toLocaleString('pt-BR')}</span></p>
        <p className="dark:text-white">Region: <span className="dark:text-gray">{props.region}</span></p>
        <p className="dark:text-white">Capital: <span className="dark:text-gray">{props.capital}</span></p>
      </div>
    </div>
  )
}