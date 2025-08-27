import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { NavigationHistory, NavigationContextType } from '../types/navigation';

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigationHistory = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigationHistory must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: React.ReactNode;
  navigation: any; // React Navigation navigation prop
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ 
  children, 
  navigation 
}) => {
  const historyRef = useRef(new NavigationHistory());
  const [canGoBack, setCanGoBack] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  const updateState = useCallback(() => {
    const history = historyRef.current;
    setCanGoBack(history.canGoBack());
    setCurrentScreen(history.getCurrent()?.screenName || null);
    setBreadcrumbs(history.getBreadcrumbs());
  }, []);

  const navigateTo = useCallback((screenName: string, params?: any) => {
    // Don't add to history if it's the same screen
    if (historyRef.current.getCurrent()?.screenName === screenName) {
      return;
    }

    historyRef.current.push(screenName, params);
    updateState();
    
    // Navigate using React Navigation
    navigation.navigate(screenName, params);
  }, [navigation, updateState]);

  const goBack = useCallback((): boolean => {
    const previousNode = historyRef.current.pop();
    
    if (previousNode) {
      updateState();
      
      // Navigate to previous screen
      navigation.navigate(previousNode.screenName, previousNode.params);
      return true;
    }
    
    return false;
  }, [navigation, updateState]);

  // Initialize with current screen
  React.useEffect(() => {
    if (navigation?.getCurrentRoute) {
      const currentRoute = navigation.getCurrentRoute();
      if (currentRoute && !historyRef.current.getCurrent()) {
        historyRef.current.push(currentRoute.name, currentRoute.params);
        updateState();
      }
    }
  }, [navigation, updateState]);

  const value: NavigationContextType = {
    history: historyRef.current,
    navigateTo,
    goBack,
    canGoBack,
    currentScreen,
    breadcrumbs,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};