export default function Card(props) {
  return (
    <div className="rounded-lg bg-white cursor-pointer flex flex-col max-w-[280px] xl:max-w-[300px] shadow-lg dark:bg-darkModeElements">
      <img src={props.flag} alt={props.alt} className="rounded-t-lg w-[280px] xl:w-[300px] h-48" />
      <div className='flex flex-col gap-0.5 px-4 py-6'>
        <h3 className='mb-3 text-xl font-bold dark:text-white'>{props.name}</h3>
        <p className="dark:text-white">Population: <span className="dark:text-gray">{(props.population).toLocaleString('pt-BR')}</span></p>
        <p className="dark:text-white">Region: <span className="dark:text-gray">{props.region}</span></p>
        <p className="dark:text-white">Capital: <span className="dark:text-gray">{props.capital}</span></p>
      </div>
    </div>
  )
}