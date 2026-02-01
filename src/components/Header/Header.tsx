import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          u:Engage
        </Link>
        <nav className="nav">
          {/* Navigation items will be added here */}
        </nav>
      </div>
    </header>
  );
}

export default Header;

