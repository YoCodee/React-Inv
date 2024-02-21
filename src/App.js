import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Currency from './components/Currency';
import Units from './components/Units';
import MasterItem from './components/MasterItem';
import UploadCSV from './components/UploadCSV';
import Supplier from './components/Supplier';
import Costumer from './components/Costumer';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Tentukan path yang tidak memerlukan tampilan Sidebar
  const pathsWithoutSidebar = ['/'];
  const pathsWithoutNavbar = ['/'];

  // Periksa apakah Sidebar harus ditampilkan berdasarkan path saat ini
  const shouldDisplaySidebar = !pathsWithoutSidebar.includes(location.pathname);
  const shouldDisplayNacbar = !pathsWithoutNavbar.includes(location.pathname);

  return (
    <>
      {shouldDisplaySidebar && <Sidebar />}
      {shouldDisplayNacbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/currency' element={<Currency />} />
        <Route path='/unit' element={<Units />} />
        <Route path='/item' element={< MasterItem/>} />
        <Route path='/upload' element={< UploadCSV/>} />
        <Route path='/supplier' element={< Supplier/>} />
        <Route path='/costumer' element={< Costumer/>} />
      </Routes>
    </>
  );
}

export default App;
