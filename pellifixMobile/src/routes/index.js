
import React from 'react';
import Login from '../components/Login'
import { NativeRouter, Route, Routes } from "react-router-native";
import Home from '../components/Home';
import Register from '../components/Register';

const AppRoutes = () => (
    <NativeRouter>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/home" element={<Home />} />
        </Routes>
    </NativeRouter>
)

export default AppRoutes