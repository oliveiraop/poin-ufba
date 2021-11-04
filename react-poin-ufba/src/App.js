import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { SessionProvider } from "./contexts/SessionContext";
import Dashboard from "./pages/dashboard/Dashboard";
import HomeScreen from "./pages/home/Home";
import LoginScreen from "./pages/login/Login";
import SignIn from "./pages/login/SignIn";

function App() {
  return (
    <SessionProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </SessionProvider>
  );
}

export default App;
