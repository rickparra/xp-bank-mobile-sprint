import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useSimpleNavigation } from '../contexts/SimpleNavigationContext';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const { navigateTo } = useSimpleNavigation();
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const quickActions = [
    {
      icon: 'send',
      label: 'PIX',
      description: 'Transferir agora',
      color: '#000000',
      route: 'PIX'
    },
    {
      icon: 'receipt',
      label: 'Boletos',
      description: 'Pagar contas',
      color: '#666666',
      route: 'Bills'
    },
    {
      icon: 'trending-up',
      label: 'Investir',
      description: 'Rendimento protegido',
      color: '#10B981',
      route: 'Investimentos'
    },
    {
      icon: 'card',
      label: 'Cartões',
      description: 'Gerenciar cartões',
      color: '#666666',
      route: 'Cartões'
    }
  ];

  const recentTransactions = [
    {
      id: '1',
      description: 'Transferência PIX - João Santos',
      amount: -150.00,
      date: '2024-01-15',
      type: 'pix_out'
    },
    {
      id: '2',
      description: 'Rendimento XBank Invest',
      amount: 45.30,
      date: '2024-01-14',
      type: 'investment'
    },
    {
      id: '3',
      description: 'PIX Recebido - Maria Silva',
      amount: 280.00,
      date: '2024-01-13',
      type: 'pix_in'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'pix_out':
        return 'send';
      case 'pix_in':
        return 'arrow-down';
      case 'investment':
        return 'trending-up';
      default:
        return 'swap-horizontal';
    }
  };

  const getTransactionColor = (amount: number) => {
    return amount >= 0 ? '#10B981' : '#EF4444';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleActionPress = (route: string) => {
    navigateTo(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0]}</Text>
              <Text style={styles.subtitle}>Seu banco digital corporativo</Text>
            </View>
            <View style={styles.headerRight}>
              <View style={styles.protectionBadge}>
                <Ionicons name="shield-checkmark" size={20} color="#10B981" />
                <Text style={styles.protectionText}>Proteção Ativa</Text>
              </View>
            </View>
          </View>

          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceContent}>
              <View style={styles.balanceLeft}>
                <Text style={styles.balanceLabel}>Saldo disponível</Text>
                <View style={styles.balanceRow}>
                  <Text style={styles.balanceAmount}>
                    {showBalance ? formatCurrency(user?.balance || 0) : 'R$ ••••••'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowBalance(!showBalance)}
                    style={styles.eyeButton}
                  >
                    <Ionicons 
                      name={showBalance ? 'eye' : 'eye-off'} 
                      size={20} 
                      color="#666666" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                <Ionicons name="log-out-outline" size={20} color="#666666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.accountInfo}>Conta Corrente • {user?.cpf}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações rápidas</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.actionCard}
                onPress={() => handleActionPress(action.route)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon as any} size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Últimas transações</Text>
            <TouchableOpacity onPress={() => navigateTo('Transactions')}>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transactionsList}>
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Ionicons 
                    name={getTransactionIcon(transaction.type) as any} 
                    size={20} 
                    color="#666666" 
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {formatDate(transaction.date)}
                  </Text>
                </View>
                <Text 
                  style={[
                    styles.transactionAmount,
                    { color: getTransactionColor(transaction.amount) }
                  ]}
                >
                  {transaction.amount >= 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Financial Projections Section */}
        <View style={styles.projectionSection}>
          <View style={styles.projectionCard}>
            <View style={styles.projectionHeader}>
              <View style={styles.projectionIcon}>
                <Ionicons name="analytics" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.projectionContent}>
                <Text style={styles.projectionTitle}>Projeções Financeiras</Text>
                <Text style={styles.projectionSubtitle}>
                  Veja quanto você ganharia investindo ao invés de apostar
                </Text>
              </View>
            </View>
            
            <View style={styles.projectionStats}>
              <View style={styles.projectionStat}>
                <Text style={styles.projectionStatValue}>R$ 2.540,90</Text>
                <Text style={styles.projectionStatLabel}>Ganho em 1 ano</Text>
              </View>
              <View style={styles.projectionStat}>
                <Text style={styles.projectionStatValue}>+18,4%</Text>
                <Text style={styles.projectionStatLabel}>Rentabilidade</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.projectionButton}
              onPress={() => navigateTo('Projections')}
            >
              <Text style={styles.projectionButtonText}>Ver Projeções Completas</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  protectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  protectionText: {
    fontSize: 12,
    color: '#CCCCCC',
    marginLeft: 4,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  balanceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  balanceLeft: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 12,
  },
  eyeButton: {
    padding: 4,
  },
  logoutButton: {
    padding: 4,
  },
  accountInfo: {
    fontSize: 12,
    color: '#666666',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  seeAll: {
    fontSize: 14,
    color: '#666666',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    width: (width - 44) / 2,
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  transactionsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
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
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 20,
  },
  // Estilos para seção de projeções financeiras
  projectionSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  projectionCard: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    padding: 20,
  },
  projectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  projectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  projectionContent: {
    flex: 1,
  },
  projectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  projectionSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 16,
  },
  projectionStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  projectionStat: {
    alignItems: 'center',
  },
  projectionStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  projectionStatLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  projectionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  projectionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default DashboardScreen;