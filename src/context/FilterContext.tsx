import { createContext, useContext, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterState } from '../types';

interface FilterContextType {
  filters: FilterState;
  updateFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FilterState = {
    search: searchParams.get('search') || '',
    userId: searchParams.get('userId') || '',
  };

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const params = new URLSearchParams(searchParams);
    
    if (newFilters.search !== undefined) {
      if (newFilters.search) {
        params.set('search', newFilters.search);
      } else {
        params.delete('search');
      }
    }
    
    if (newFilters.userId !== undefined) {
      if (newFilters.userId) {
        params.set('userId', newFilters.userId);
      } else {
        params.delete('userId');
      }
    }

    params.delete('page');
    setSearchParams(params, { replace: true });
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    params.delete('userId');
    params.delete('page');
    setSearchParams(params, { replace: true });
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider');
  }
  return context;
};

