import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Country from "./pages/Country";
import { useState } from "react";
import CountriesContext from "./contexts/CountriesContext";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [countries, setCountries] = useState(null);

  return (
    <>
      <CountriesContext.Provider value={{ allCountries, setAllCountries, countries, setCountries }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:country" element={<Country />} />
          </Routes>
        </Router>
      </CountriesContext.Provider>
    </>
  )
}

export default App;
