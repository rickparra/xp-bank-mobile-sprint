import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';

const TransactionsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const transactions = [
    {
      id: '1',
      type: 'pix',
      description: 'PIX enviado para Maria Santos',
      amount: -250.00,
      date: '2024-01-15T14:30:00',
      status: 'completed',
    },
    {
      id: '2',
      type: 'income',
      description: 'Salário - Empresa XYZ',
      amount: 5000.00,
      date: '2024-01-15T09:00:00',
      status: 'completed',
    },
    {
      id: '3',
      type: 'payment',
      description: 'Pagamento Cartão de Crédito',
      amount: -890.50,
      date: '2024-01-14T16:45:00',
      status: 'completed',
    },
    {
      id: '4',
      type: 'investment',
      description: 'Aplicação CDB XBank',
      amount: -1000.00,
      date: '2024-01-13T11:20:00',
      status: 'completed',
    },
    {
      id: '5',
      type: 'pix',
      description: 'PIX recebido de João Silva',
      amount: 150.00,
      date: '2024-01-12T18:15:00',
      status: 'completed',
    },
  ];

  const filters = [
    { key: 'all', label: 'Todas' },
    { key: 'pix', label: 'PIX' },
    { key: 'payment', label: 'Pagamentos' },
    { key: 'income', label: 'Receitas' },
    { key: 'investment', label: 'Investimentos' },
  ];

  const filteredTransactions = selectedFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === selectedFilter);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'pix':
        return 'send';
      case 'income':
        return 'arrow-down';
      case 'payment':
        return 'card';
      case 'investment':
        return 'trending-up';
      default:
        return 'swap-horizontal';
    }
  };

  const renderTransaction = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <Ionicons 
          name={getTransactionIcon(item.type) as any} 
          size={20} 
          color="#666666" 
        />
      </View>
      
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.transactionDate}>
          {formatDate(item.date)} às {formatTime(item.date)}
        </Text>
      </View>
      
      <Text style={[
        styles.transactionAmount,
        { color: item.amount >= 0 ? '#10B981' : '#EF4444' }
      ]}>
        {item.amount >= 0 ? '+' : ''}{formatCurrency(item.amount)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader 
        title="Extrato"
        subtitle="Histórico de transações"
      />

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilter === filter.key && styles.filterButtonActive
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter.key && styles.filterTextActive
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Transactions List */}
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        style={styles.transactionsList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
  },
  filtersContent: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  filterButtonActive: {
    backgroundColor: '#000000',
  },
  filterText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  transactionsList: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 68,
  },
});

export default TransactionsScreen;