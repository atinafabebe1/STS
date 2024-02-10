import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SchoolContextProps {
  handleRefresh: () => void;
  refreshData:boolean;
}

const SchoolContext = createContext<SchoolContextProps | undefined>(undefined);

export const useSchoolContext = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchoolContext must be used within a SchoolProvider');
  }
  return context;
};

interface SchoolProviderProps {
  children: ReactNode;
}

export const SchoolProvider: React.FC<SchoolProviderProps> = ({ children }) => {
  const [refreshData, setRefreshData] = useState(false);

  const handleRefresh = () => {
    setRefreshData(true); 
  };

  useEffect(() => {
    if (refreshData) {
      setRefreshData(false);
    }
  }, [refreshData]);

  const contextValue: SchoolContextProps = {
    handleRefresh,
    refreshData
  };

  return <SchoolContext.Provider value={contextValue}>{children}</SchoolContext.Provider>;
};
