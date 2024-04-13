import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import SignUpForm from './Login/signUp';
import LoginForm from './Login/Login';
import ForgotPassword from './Login/forgotPassword';
import UserHome from './userHome';
import History from './History';
import Hero from './Hero';
import UserProfile from './Profile';
import ToWatch from './toWatch';
import SearchResults from './searchResults'
import { yellow, grey } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: yellow[500],
      },
      secondary: {
        main: grey[50],
      }
    },
  });

export default function App() {
    return(
        <ThemeProvider theme={theme}>
        <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/home" element={<UserHome />} />
            <Route path="/to-watch" element={<ToWatch />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/search" element={<SearchResults />} />
        </Routes>
        </ThemeProvider>
    );
}