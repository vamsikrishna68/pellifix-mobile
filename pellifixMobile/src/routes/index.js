import React from 'react';
import Login from '../components/Login';
import {NativeRouter, Route, Routes} from 'react-router-native';
import Home from '../components/Home';
import Register from '../components/Register';
import ForgotPassword from '../components/ForgotPassword'
import Layout from '../components/Layout';
import Profile from '../components/Profile';
import EditPreference from '../components/EditPreference';
import ViewProfile from '../components/ViewProfile';
import Subscription from '../components/Subscription';

const AppRoutes = () => (
  <NativeRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route exact path="/auth" element={<Layout />}>
        <Route exact path="home" element={<Home />} />
        <Route exact path="profile" element={<Profile />} />
        <Route exact path="edit-preference" element={<EditPreference />} />
        <Route exact path='view-profile' element={<ViewProfile />} />
        <Route exact path="subscription" element={<Subscription />} />
      </Route>
    </Routes>
  </NativeRouter>
);

export default AppRoutes;
