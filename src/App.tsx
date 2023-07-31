import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './hooks/useAuth';
import DashBoard from './pages/Dashboard';
import Login from './pages/Login';
import './style.css';

export default function App() {
  const isAuthenticated = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
