import { useEffect, useState, useRef } from 'react';
import { useFilters } from '../../context/FilterContext';
import './SharedFilters.css';

function SharedFilters() {
  const { filters, updateFilters } = useFilters();
  const [searchValue, setSearchValue] = useState(filters.search);
  const [userIdValue, setUserIdValue] = useState(filters.userId);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setSearchValue(filters.search);
    setUserIdValue(filters.userId);
  }, [filters]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      updateFilters({ search: value });
    }, 300);
  };

  const handleUserIdChange = (value: string) => {
    setUserIdValue(value);
    updateFilters({ userId: value });
  };

  return (
    <div className="shared-filters">
      <div className="filter-group">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="filter-input"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="userId">User ID</label>
        <input
          id="userId"
          type="number"
          placeholder="Filter by User ID"
          value={userIdValue}
          onChange={(e) => handleUserIdChange(e.target.value)}
          className="filter-input"
        />
      </div>
    </div>
  );
}

export default SharedFilters;

