import { useNavigate, useLocation } from 'react-router-dom';
import { TabType } from '../../types';
import './DashboardTabs.css';

const tabs: TabType[] = ['users', 'posts', 'comments', 'albums'];

function DashboardTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the current tab from the pathname
  const currentPath = location.pathname;
  const activeTab = tabs.find((tab) => currentPath.includes(`/dashboard/${tab}`)) || null;

  const handleTabClick = (tabName: TabType) => {
    navigate(`/dashboard/${tabName}`);
  };

  return (
    <div className="dashboard-tabs">
      {tabs.map((tabName) => {
        const isActive = activeTab === tabName;
        return (
          <button
            key={tabName}
            className={`tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => handleTabClick(tabName)}
          >
            {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

export default DashboardTabs;

