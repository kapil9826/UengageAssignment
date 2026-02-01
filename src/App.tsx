import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import { FilterProvider } from './context/FilterContext';

function App() {
  return (
    <FilterProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/users" replace />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </FilterProvider>
  );
}

export default App;

