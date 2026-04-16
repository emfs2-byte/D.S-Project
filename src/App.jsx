import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
// A linha abaixo PRECISA estar com o nome novo: Dashboard
import Dashboard from "./pages/Dashboard"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* A linha abaixo PRECISA chamar o <Dashboard /> */}
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;