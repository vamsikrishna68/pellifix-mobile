import React from 'react';
import Login from '../components/Login';
import { NativeRouter, Navigate, Route, Routes } from 'react-router-native';

import Home from '../components/Home';
import Register from '../components/Register';
import ForgotPassword from '../components/ForgotPassword'
import Layout from '../components/Layout';
import Profile from '../components/Profile';
import EditPreference from '../components/EditPreference';
import ViewProfile from '../components/ViewProfile';
import Subscription from '../components/Subscription';
import Chat from '../components/Chat/index1';
import CompareProfile from '../components/CompareProfile';
import WishList from '../components/WishList';
import { CometChatMessages } from '../components/Chat';

const AppRoutes = (props) => {
  return <NativeRouter>
    <Routes>
      <Route exact path="/" element={props && props.loginData && props.loginData.token ?
        <Navigate to='/auth/home' />
        : <Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />

      <Route exact path="/auth" element={<Layout />}>
        <Route exact path="home" element={<Home />} />
        <Route exact path="profile" element={<Profile />} />
        <Route exact path="edit-preference" element={<EditPreference />} />
        <Route exact path='view-profile' element={<ViewProfile />} />
        <Route exact path="subscription" element={<Subscription />} />
        <Route exact path="chat" element={<Chat />} />
        <Route exact path="wish-list" element={<WishList />} />
        <Route exact path="compare-profiles" element={<CompareProfile />} />
        <Route exact path="CometChatMessages" element={<CometChatMessages />} />

      </Route>
      <Route exact path="/login" element={<Login />} />
    </Routes>
  </NativeRouter>
};

export default AppRoutes;
