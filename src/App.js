import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Country from "./pages/Country";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:country" element={<Country />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
