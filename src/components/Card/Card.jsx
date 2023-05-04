import { useNavigate } from "react-router-dom";
import Info from "../Info/Info";

export default function Card({props}) {
  const navigate = useNavigate();

  function redirectCountry(country) {
    navigate(`/${country.name}`);
  }

  return (
    <div className="rounded-lg bg-white cursor-pointer flex flex-col max-w-[280px] xl:max-w-[300px] shadow-lg dark:bg-darkModeElements" onClick={() => redirectCountry(props)}>
      <img src={props.flags.png} alt={props.name} className="rounded-t-lg w-[280px] xl:w-[300px] h-48" />
      <div className='flex flex-col gap-0.5 px-4 py-6'>
        <h3 className='mb-3 text-xl font-bold dark:text-white'>{props.name}</h3>
        <Info name="Population" data={(props.population).toLocaleString()} />
        <Info name="Region" data={props.region} />
        <Info name="Capital" data={props.capital || "None"} />
      </div>
    </div>
  )
}