import { Routes, Route } from "react-router-dom";

import Dashboard from "./page/Dashboard";
import Hotels from "./page/Hotels";
import Inscriptions from "./page/Inscriptions";
import Connexion from "./page/Connexion";
import MotDePasseOublie from "./page/MotDePasseOublie";
import Layout from "./components/Layout";
import PublicLayout from "./PublicLayout";

import "./App.css";

function App() {
  return (
    <Routes>

      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Connexion />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscriptions" element={<Inscriptions />} />
        <Route path="/MotDePasseOublie" element={<MotDePasseOublie />} />
      </Route>

      {/* Private / App routes */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotels" element={<Hotels />} />
      </Route>

    </Routes>
  );
}

export default App;
