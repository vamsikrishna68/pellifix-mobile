import React from 'react';
import Login from '../components/Login';
import {NativeRouter, Route, Routes} from 'react-router-native';
import Home from '../components/Home';
import Register from '../components/Register';
import Layout from '../components/Layout';

const AppRoutes = () => (
  <NativeRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/auth" element={<Layout />}>
        <Route exact path="home" element={<Home />} />
      </Route>
    </Routes>
  </NativeRouter>
);

export default AppRoutes;
