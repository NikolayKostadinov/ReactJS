import React from "react";
import {Route, Routes} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import {AlertProvider} from './contexts/AlertContext';
import {MenuFilteringContextProvider} from "./contexts/MenuFilteringContext.js";
import {RestaurantManagementContextProvider} from './contexts/RestaurantManagementContext';

import MainNavigation from './components/main-nav/MainNavigation';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import Authenticated from './components/common/route-guards/Authenticated.js';
import Register from './components/register/Register';
import Menu from './components/menu/Menu';
import RestaurantManagement from './components/restaurant-management/RestaurantManagement';
import Reservation from './components/reservation/Reservation';
import Alert from './components/common/alert/Alert';
import Spinner from './components/common/spinner/Spinner';
import ReservationManagement from './components/reservation/reservation-management/ReservationManagement';
import Error from "./components/error/Error.js";

import './App.css';

function App() {
    return (
        <AlertProvider>
            <AuthProvider>
                <div className="App">
                    <MenuFilteringContextProvider>
                        <MainNavigation/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/reservation/:restaurantId/:title" element={<Reservation/>}/>
                            <Route path="/menu/:restaurantId" element={<Menu/>}/>
                            <Route element={<Authenticated/>}>
                                <Route path="/logout" element={<Logout/>}/>
                                <Route path="/management" element={
                                    <RestaurantManagementContextProvider>
                                        <RestaurantManagement/>
                                    </RestaurantManagementContextProvider>
                                }/>
                                <Route path="/reservations" element={<ReservationManagement/>}/>
                            </Route>
                            <Route path="*" element={<Error code="400" message="Желания от вас ресурс не е открит!"/>}/>
                        </Routes>
                        <Footer/>
                    </MenuFilteringContextProvider>
                </div>
                <Spinner/>
                <Alert/>
            </AuthProvider>
        </AlertProvider>
    );
}

export default App;
