import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLocation, useNavigate } from 'react-router-dom';
import Info from '../components/Info/Info';

export default function Country() {
  const navigate = useNavigate();
  const location = useLocation();
  const countryData = location.state;

  return (
    <>
      <div className="px-5 md:px-24 py-10 sm:flex-row sm:justify-between">
        <button className='bg-white flex items-center gap-3 cursor-pointer shadow-lg py-3 px-8 rounded-lg dark:bg-darkModeElements dark:text-white' onClick={() => navigate('/')}>
          <KeyboardBackspaceIcon />
          Back
        </button>
      </div>
      <div className='px-5 md:px-24'>
        <img className="w-screen" src={countryData.flags.png} alt={countryData.name.common} />
        <div>
          <h1>{countryData.name.common}</h1>
          <div>
            <div>
              <Info name="Native Name" data={countryData.nativeName} />
              <Info name="Population" data={countryData.population.toLocaleString()} />
              <Info name="Region" data={countryData.region} />
              <Info name="Sub Region" data={countryData.subregion} />
              <Info name="Capital" data={countryData.capital} />
            </div>
            <div>
              <Info name="Top Level Domain" data={countryData.topLevelDomain.map((item) => {
                return item
              }).join(', ')} />
              <Info name="Currencies" data={countryData.currencies.map((item) => {
                return item.name
              }).join(', ')} />
              <Info name="Languages" data={countryData.languages.map((item) => {
                return item.name
              }).join(', ')} />
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>
    </>
  )
}