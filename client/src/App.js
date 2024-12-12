import './App.css';
import { Routes, Route, BrowserRouter  } from 'react-router-dom';
import Header from './Components/header/Header';
import FirstPage from './pages/First_page/FirstPage';
import SecPage from './pages/SecPage/SecPage';
import Register from './pages/Registration/Register';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import CardDetails from './pages/CardDetails/CardDetails';
import SolarFlares from './pages/HomePage/SolarFlares';
import EarthImage from './Components/EarthImage/EarthImage';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';


function App() {
    const { user } = useContext(AuthContext);
    
    return (
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={
                        user ? <SolarFlares /> : <Login />} />
                    <Route path="/fir" element={
                        user ? <FirstPage /> : <Login />} />
                    <Route path="/sec" element={
                        user ? <SecPage /> : <Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/phearth" element={
                        user ? <EarthImage /> : <Login />} />
                    <Route path='/profile' element={
                        user ? <Admin user={user} /> : <Login />} />
                    <Route path='/card/:id' element={<CardDetails />} />
                </Routes>
            </BrowserRouter>
    );
}

export default App;
