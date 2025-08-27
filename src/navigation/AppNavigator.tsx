import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, ActivityIndicator } from 'react-native';
import { SimpleNavigationProvider } from '../contexts/SimpleNavigationContext';

// Screens
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PIXTransferScreen from '../screens/PIXTransferScreen';
import InvestmentsScreen from '../screens/InvestmentsScreen';
import BillsScreen from '../screens/BillsScreen';
import CardsScreen from '../screens/CardsScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import ProtectionScreen from '../screens/ProtectionScreen';

import { useAuth } from '../contexts/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'PIX') {
            iconName = focused ? 'send' : 'send-outline';
          } else if (route.name === 'Investimentos') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Cartões') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Mais') {
            iconName = focused ? 'menu' : 'menu-outline';
          } else {
            iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ 
          title: 'Início',
          headerShown: false 
        }}
      />
      <Tab.Screen 
        name="PIX" 
        component={PIXTransferScreen}
        options={{ title: 'PIX' }}
      />
      <Tab.Screen 
        name="Investimentos" 
        component={InvestmentsScreen}
        options={{ title: 'Investir' }}
      />
      <Tab.Screen 
        name="Cartões" 
        component={CardsScreen}
        options={{ title: 'Cartões' }}
      />
      <Tab.Screen 
        name="Mais" 
        component={ProtectionScreen}
        options={{ 
          title: 'Mais',
          headerShown: false 
        }}
      />
    </Tab.Navigator>
  );
};

// Main content component
const MainContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Transactions" component={TransactionsScreen} />
          <Stack.Screen name="Bills" component={BillsScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <SimpleNavigationProvider>
        <MainContent />
      </SimpleNavigationProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;