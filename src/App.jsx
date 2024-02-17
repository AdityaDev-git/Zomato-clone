import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage } from "./Components/HomePage";
import Details from "./Components/Details";
import FilterPage from "./Components/FilterPage";
import Cart from "./Components/Cart";


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/filter" element={ <FilterPage/> } />
        <Route path="/details" element={ <Details/> } />
        <Route path="/cart" element={ <Cart/> } />
      </Routes>
    </Router>
    </>
  );
}

export default App;
