import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./pages/Dashboard";
import { ClinicasProvider } from "./contexts/ClinicasContext"; // ← import novo

function App() {
  return (
    <ClinicasProvider> {/* ← envolve tudo */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </Router>
    </ClinicasProvider>
  );
}

export default App;