import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage } from "./Components/HomePage";
import Details from "./Components/Details";


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/details" element={ <Details/> } />
      </Routes>
    </Router>
    </>
  );
}

export default App;
