import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Home from './pages/home';
import Moldes1680 from './pages/moldes1680';
import SantaFe3770 from './pages/santafe3770';
import Dorrego1548 from './pages/dorrego1548';
import Convencion1994 from './pages/Convencion1994';
import Ugarteche2824 from './pages/ugarteche2824';
import NotFound from './pages/NotFound';  // Update this line
import Loading from './components/Loading/Loading';
import Footer from './components/Footer/footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/moldes1680" element={<Moldes1680 />} />
            <Route path="/santafe3770" element={<SantaFe3770 />} />
            <Route path="/dorrego1548" element={<Dorrego1548 />} />
            <Route path="/convencion1994" element={<Convencion1994 />} />
            <Route path="/ugarteche2824" element={<Ugarteche2824 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;