import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

interface SimpleNavigationContextType {
  navigateTo: (screenName: string, params?: any) => void;
  goBack: () => boolean;
  canGoBack: boolean;
  navigationHistory: string[];
}

const SimpleNavigationContext = createContext<SimpleNavigationContextType | undefined>(undefined);

export const useSimpleNavigation = () => {
  const context = useContext(SimpleNavigationContext);
  if (context === undefined) {
    throw new Error('useSimpleNavigation must be used within a SimpleNavigationProvider');
  }
  return context;
};

export const SimpleNavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigation = useNavigation();
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const [canGoBack, setCanGoBack] = useState(false);

  const navigateTo = useCallback((screenName: string, params?: any) => {
    // Add to history if it's a different screen
    setNavigationHistory(prev => {
      const newHistory = [...prev, screenName];
      // Keep only last 10 items
      return newHistory.slice(-10);
    });
    
    setCanGoBack(true);
    navigation.navigate(screenName as never, params as never);
  }, [navigation]);

  const goBack = useCallback((): boolean => {
    if (navigation.canGoBack()) {
      setNavigationHistory(prev => {
        const newHistory = prev.slice(0, -1);
        setCanGoBack(newHistory.length > 0);
        return newHistory;
      });
      
      navigation.goBack();
      return true;
    }
    return false;
  }, [navigation]);

  const value: SimpleNavigationContextType = {
    navigateTo,
    goBack,
    canGoBack: navigation.canGoBack?.() || false,
    navigationHistory,
  };

  return (
    <SimpleNavigationContext.Provider value={value}>
      {children}
    </SimpleNavigationContext.Provider>
  );
};