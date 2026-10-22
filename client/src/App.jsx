import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Auth from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import VehicleForm from './pages/VehicleForm.jsx';
import { clearSession, getToken } from './services/api.js';
export default function App(){const location=useLocation();useEffect(()=>{const logout=()=>{clearSession();window.location.href='/login';};window.addEventListener('fleetflow:logout',logout);return()=>window.removeEventListener('fleetflow:logout',logout);},[]);return <Routes><Route path="/login" element={getToken()?<Navigate to="/" replace/>:<Auth mode="login"/>}/><Route path="/register" element={getToken()?<Navigate to="/" replace/>:<Auth mode="register"/>}/><Route element={<ProtectedRoute/>}><Route element={<Layout/>}><Route path="/" element={<Dashboard key={location.key}/>}/><Route path="/vehicles/new" element={<VehicleForm/>}/><Route path="/vehicles/:id/edit" element={<VehicleForm/>}/></Route></Route><Route path="*" element={<Navigate to={getToken()?'/':'/login'} replace/>}/></Routes>;}
