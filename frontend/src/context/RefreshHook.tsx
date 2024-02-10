import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RefreshContextProps {
  handleRefresh: () => void;
  refreshData:boolean;
}

const RefreshContext = createContext<RefreshContextProps | undefined>(undefined);

export const useRefreshContext = () => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error('useRefreshContext must be used within a RefreshProvider');
  }
  return context;
};

interface RefreshProviderProps {
  children: ReactNode;
}

export const RefreshProvider: React.FC<RefreshProviderProps> = ({ children }) => {
  const [refreshData, setRefreshData] = useState(false);

  const handleRefresh = () => {
    setRefreshData(true); 
  };

  useEffect(() => {
    if (refreshData) {
      setRefreshData(false);
    }
  }, [refreshData]);

  const contextValue: RefreshContextProps = {
    handleRefresh,
    refreshData
  };

  return <RefreshContext.Provider value={contextValue}>{children}</RefreshContext.Provider>;
};
