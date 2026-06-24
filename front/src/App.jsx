import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./pages/Dashboard";
import { ClinicasProvider } from "./contexts/ClinicasContext";

function App() {
  return (
    <ClinicasProvider>
      {/* O basename avisa ao React que o site está rodando dentro da pasta /NPI */}
      <Router basename="/NPI">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </Router>
    </ClinicasProvider>
  );
}

export default App;