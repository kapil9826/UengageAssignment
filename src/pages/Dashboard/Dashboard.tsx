import { Routes, Route } from 'react-router-dom';
import DashboardTabs from '../../components/DashboardTabs/DashboardTabs';
import DashboardList from '../DashboardList/DashboardList';
import DetailView from '../DetailView/DetailView';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <DashboardTabs />
      <Routes>
        <Route path=":tab" element={<DashboardList />} />
        <Route path=":tab/:id" element={<DetailView />} />
      </Routes>
    </div>
  );
}

export default Dashboard;

