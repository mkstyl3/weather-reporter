import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/Dashboard"
import City from "./pages/City"
import DashboardForm from "./components/DashboardForm/DashboardForm";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
{/*
              <Route index element={<Login />} />
*/}
              <Route index element={<Dashboard/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/city_info" element={<City/>} />
              <Route path="/city_info/:name/:ar/:lat/:long" element={<City/>} />
              <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;




