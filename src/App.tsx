import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public home */}
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col bg-bg">
              <Navbar />
              <main><Hero /></main>
            </div>
          }
        />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect undefined routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
