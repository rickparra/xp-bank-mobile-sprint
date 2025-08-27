import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSimpleNavigation } from '../contexts/SimpleNavigationContext';

interface CustomHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  subtitle,
  showBackButton = true,
  rightComponent,
  onBackPress,
}) => {
  const { goBack, canGoBack, navigationHistory } = useSimpleNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      goBack();
    }
  };

  const shouldShowBackButton = showBackButton && canGoBack;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Left side - Back button */}
        <View style={styles.leftContainer}>
          {shouldShowBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Center - Title and subtitle */}
        <View style={styles.centerContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right side - Custom component */}
        <View style={styles.rightContainer}>
          {rightComponent}
        </View>
      </View>

      {/* Breadcrumbs - Optional */}
      {navigationHistory.length > 1 && (
        <View style={styles.breadcrumbContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.breadcrumbContent}
          >
            {navigationHistory.map((screen, index) => (
              <View key={index} style={styles.breadcrumbItem}>
                <Text style={styles.breadcrumbText}>
                  {getScreenDisplayName(screen)}
                </Text>
                {index < navigationHistory.length - 1 && (
                  <Ionicons 
                    name="chevron-forward" 
                    size={12} 
                    color="#CCCCCC" 
                    style={styles.breadcrumbSeparator}
                  />
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

// Helper function to get display names for screens
const getScreenDisplayName = (screenName: string): string => {
  const displayNames: { [key: string]: string } = {
    'Dashboard': 'Início',
    'PIX': 'PIX',
    'Investimentos': 'Investir',
    'Cartões': 'Cartões',
    'Bills': 'Boletos',
    'Transactions': 'Extrato',
    'Mais': 'Perfil',
    'Login': 'Login',
  };
  
  return displayNames[screenName] || screenName;
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#000000',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 60,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 2,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  breadcrumbContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  breadcrumbContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbText: {
    fontSize: 10,
    color: '#CCCCCC',
  },
  breadcrumbSeparator: {
    marginHorizontal: 4,
  },
});

export default CustomHeader;