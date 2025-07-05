import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { AdminProvider } from './context/AdminContext';
import { AuthProvider } from './context/AuthContextAPI';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Home from './pages/Home';
import Moldes1680 from './pages/Moldes-1680';
import SantaFe3770 from './pages/SantaFe-3770';
import Dorrego1548 from './pages/Dorrego-1548';
import Convencion1994 from './pages/Convencion-1994';
import Ugarteche2824 from './pages/Ugarteche-2824';
import Admin from './pages/Admin';
import TestGallery from './pages/TestGallery';
import ConfigTest from './pages/ConfigTest';
import DebugTest from './pages/DebugTest';
import MyReservations from './components/MyReservations/MyReservations';
import UserProfile from './components/UserProfile/UserProfile';
import ResetPassword from './components/Auth/ResetPassword';
import NotFound from './pages/NotFound';
import Loading from './components/Loading/Loading';
import Footer from './components/Footer/footer';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <div className="app">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/departamentos/moldes-1680" element={<Moldes1680 />} />
                <Route path="/departamentos/santa-fe-3770" element={<SantaFe3770 />} />
                <Route path="/departamentos/dorrego-1548" element={<Dorrego1548 />} />
                <Route path="/departamentos/convencion-1994" element={<Convencion1994 />} />
                <Route path="/departamentos/ugarteche-2824" element={<Ugarteche2824 />} />
                <Route path="/test-gallery" element={<TestGallery />} />
                <Route path="/config-test" element={<ConfigTest />} />
                <Route path="/debug-test" element={<DebugTest />} />
                <Route path="/my-reservations" element={<MyReservations />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly={true}>
                    <Admin />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
