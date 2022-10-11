
import React from 'react';
import Login from '../components/Login'
import { NativeRouter, Route, Routes } from "react-router-native";

const AppRoutes = () => (
    <NativeRouter>
        <Routes>
            <Route exact path="/" element={<Login />} />
        </Routes>
    </NativeRouter>
)

export default AppRoutes