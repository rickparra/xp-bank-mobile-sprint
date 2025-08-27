import { useNavigation } from '@react-navigation/native';
import { useSimpleNavigation } from '../contexts/SimpleNavigationContext';

export const useCustomNavigation = () => {
  const navigation = useNavigation();
  const { navigateTo, goBack, canGoBack, navigationHistory } = useSimpleNavigation();

  return {
    // Custom navigation with history
    navigateTo,
    goBack,
    canGoBack,
    navigationHistory,
    
    // React Navigation methods (fallback)
    navigate: navigation.navigate,
    reset: navigation.reset,
    setParams: navigation.setParams,
    
    // Utility methods
    goBackOrHome: () => {
      if (canGoBack) {
        goBack();
      } else {
        navigateTo('Dashboard');
      }
    },
    
    // Quick navigation methods
    goToDashboard: () => navigateTo('Dashboard'),
    goToPIX: () => navigateTo('PIX'),
    goToInvestments: () => navigateTo('Investimentos'),
    goToCards: () => navigateTo('Cartões'),
    goToBills: () => navigateTo('Bills'),
    goToTransactions: () => navigateTo('Transactions'),
    goToProfile: () => navigateTo('Mais'),
  };
};