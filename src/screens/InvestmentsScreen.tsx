import React from 'react';
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
import CustomHeader from '../components/CustomHeader';

const { width } = Dimensions.get('window');

const InvestmentsScreen = () => {
  const investments = [
    {
      id: '1',
      name: 'Tesouro Selic 2029',
      type: 'Renda Fixa',
      profitability: 13.75,
      risk: 'Baixo',
      amount: 5000,
      profit: 156.25,
      color: '#10B981',
      description: 'Título público indexado à taxa Selic'
    },
    {
      id: '2',
      name: 'CDB XBank Premium',
      type: 'Renda Fixa',
      profitability: 14.2,
      risk: 'Baixo',
      amount: 3000,
      profit: 98.50,
      color: '#3B82F6',
      description: 'CDB com liquidez diária'
    },
    {
      id: '3',
      name: 'Fundo Multimercado Alpha',
      type: 'Renda Variável',
      profitability: 18.5,
      risk: 'Médio',
      amount: 2000,
      profit: -45.30,
      color: '#F59E0B',
      description: 'Fundo diversificado de renda variável'
    },
    {
      id: '4',
      name: 'XBank Cripto',
      type: 'Criptomoedas',
      profitability: 25.8,
      risk: 'Alto',
      amount: 1500,
      profit: 287.40,
      color: '#8B5CF6',
      description: 'Exposição a criptomoedas principais'
    }
  ];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalProfit = investments.reduce((sum, inv) => sum + inv.profit, 0);
  const totalValue = totalInvested + totalProfit;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Baixo':
        return '#10B981';
      case 'Médio':
        return '#F59E0B';
      case 'Alto':
        return '#EF4444';
      default:
        return '#666666';
    }
  };

  const getProfitColor = (profit: number) => {
    return profit >= 0 ? '#10B981' : '#EF4444';
  };

  const getProfitIcon = (profit: number) => {
    return profit >= 0 ? 'trending-up' : 'trending-down';
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader 
        title="Investimentos"
        subtitle="Faça seu dinheiro render mais"
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Investido</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(totalInvested)}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Rentabilidade</Text>
            <View style={styles.profitRow}>
              <Ionicons 
                name={getProfitIcon(totalProfit)} 
                size={16} 
                color={getProfitColor(totalProfit)} 
              />
              <Text style={[styles.profitAmount, { color: getProfitColor(totalProfit) }]}>
                {formatCurrency(totalProfit)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Patrimônio Total</Text>
          <Text style={styles.totalAmount}>{formatCurrency(totalValue)}</Text>
          <Text style={styles.totalGrowth}>
            +{((totalProfit / totalInvested) * 100).toFixed(2)}% no período
          </Text>
        </View>

        {/* Investments List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meus investimentos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {investments.map((investment) => (
            <TouchableOpacity key={investment.id} style={styles.investmentCard}>
              <View style={styles.investmentHeader}>
                <View style={styles.investmentLeft}>
                  <View style={[styles.investmentIcon, { backgroundColor: investment.color }]}>
                    <Ionicons name="trending-up" size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.investmentInfo}>
                    <Text style={styles.investmentName}>{investment.name}</Text>
                    <Text style={styles.investmentType}>{investment.type}</Text>
                    <Text style={styles.investmentDescription}>{investment.description}</Text>
                  </View>
                </View>
                <View style={styles.investmentRight}>
                  <Text style={styles.investmentAmount}>{formatCurrency(investment.amount)}</Text>
                  <View style={styles.profitRow}>
                    <Ionicons 
                      name={getProfitIcon(investment.profit)} 
                      size={12} 
                      color={getProfitColor(investment.profit)} 
                    />
                    <Text style={[styles.investmentProfit, { color: getProfitColor(investment.profit) }]}>
                      {formatCurrency(investment.profit)}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.investmentFooter}>
                <View style={styles.profitabilityContainer}>
                  <Ionicons name="trending-up" size={14} color="#10B981" />
                  <Text style={styles.profitabilityText}>
                    {investment.profitability}% a.a.
                  </Text>
                </View>
                <View style={[styles.riskBadge, { backgroundColor: getRiskColor(investment.risk) }]}>
                  <Text style={styles.riskText}>Risco {investment.risk}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Ações rápidas</Text>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Novo Investimento</Text>
              <Text style={styles.actionDescription}>Explore novas oportunidades</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="analytics" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Relatórios</Text>
              <Text style={styles.actionDescription}>Acompanhe seu desempenho</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#10B981' }]}>
              <Ionicons name="school" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Educação Financeira</Text>
              <Text style={styles.actionDescription}>Aprenda a investir melhor</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666666" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },

  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  profitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profitAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  totalCard: {
    backgroundColor: '#000000',
    margin: 16,
    marginTop: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  totalGrowth: {
    fontSize: 14,
    color: '#10B981',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 8,
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
  investmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  investmentLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  investmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  investmentInfo: {
    flex: 1,
  },
  investmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  investmentType: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  investmentDescription: {
    fontSize: 11,
    color: '#999999',
  },
  investmentRight: {
    alignItems: 'flex-end',
  },
  investmentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  investmentProfit: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 2,
  },
  investmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profitabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profitabilityText: {
    fontSize: 14,
    color: '#10B981',
    marginLeft: 4,
    fontWeight: '500',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  actionsSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666666',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default InvestmentsScreen;