import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Carregando...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000000" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
});

export default Loading;