import { useNavigate, useParams } from 'react-router-dom';
import { TabType } from '../../types';
import './DashboardTabs.css';

const tabs: TabType[] = ['users', 'posts', 'comments', 'albums'];

function DashboardTabs() {
  const navigate = useNavigate();
  const { tab } = useParams<{ tab: TabType }>();

  const handleTabClick = (tabName: TabType) => {
    navigate(`/dashboard/${tabName}`);
  };

  return (
    <div className="dashboard-tabs">
      {tabs.map((tabName) => (
        <button
          key={tabName}
          className={`tab-btn ${tab === tabName ? 'active' : ''}`}
          onClick={() => handleTabClick(tabName)}
        >
          {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default DashboardTabs;

