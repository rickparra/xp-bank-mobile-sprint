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
import { useSimpleNavigation } from '../contexts/SimpleNavigationContext';

const { width } = Dimensions.get('window');

const ProjectionsScreen = () => {
  const { user } = useAuth();
  const { navigateTo, goBack } = useSimpleNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState('1year');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const periods = [
    { id: '6months', label: '6 meses', months: 6 },
    { id: '1year', label: '1 ano', months: 12 },
    { id: '2years', label: '2 anos', months: 24 },
    { id: '5years', label: '5 anos', months: 60 },
  ];

  // Dados simulados baseados no valor médio que seria gasto em apostas
  const averageMonthlyGambling = 800.00; // Valor médio mensal que seria gasto em apostas
  const investmentReturn = 0.012; // 1.2% ao mês (CDI aproximado)

  const calculateProjections = (months: number) => {
    const totalGambled = averageMonthlyGambling * months;
    
    // Cálculo de juros compostos para investimento
    let investmentValue = 0;
    for (let i = 0; i < months; i++) {
      investmentValue = (investmentValue + averageMonthlyGambling) * (1 + investmentReturn);
    }
    
    const difference = investmentValue - totalGambled;
    const profitability = ((investmentValue / totalGambled) - 1) * 100;

    return {
      totalGambled,
      investmentValue,
      difference,
      profitability,
      months
    };
  };

  const currentProjection = calculateProjections(
    periods.find(p => p.id === selectedPeriod)?.months || 12
  );

  const projectionComparisons = [
    {
      title: 'Total que seria perdido em apostas',
      value: currentProjection.totalGambled,
      color: '#EF4444',
      icon: 'trending-down',
      backgroundColor: '#FEE2E2',
    },
    {
      title: 'Valor se investido no CDI',
      value: currentProjection.investmentValue,
      color: '#10B981',
      icon: 'trending-up',
      backgroundColor: '#D1FAE5',
    },
    {
      title: 'Diferença (Ganho)',
      value: currentProjection.difference,
      color: '#3B82F6',
      icon: 'add-circle',
      backgroundColor: '#DBEAFE',
    },
  ];

  const investmentOptions = [
    {
      name: 'CDI',
      returnRate: '13,75% a.a.',
      risk: 'Baixo',
      description: 'Renda fixa com liquidez diária',
      projectedValue: currentProjection.investmentValue,
      color: '#10B981'
    },
    {
      name: 'Tesouro Direto',
      returnRate: '12,50% a.a.',
      risk: 'Baixo',
      description: 'Títulos públicos do governo',
      projectedValue: currentProjection.investmentValue * 0.95,
      color: '#3B82F6'
    },
    {
      name: 'Fundos Imobiliários',
      returnRate: '8,20% a.a. + Dividendos',
      risk: 'Médio',
      description: 'Investimento em imóveis comerciais',
      projectedValue: currentProjection.investmentValue * 0.85,
      color: '#8B5CF6'
    },
  ];

  const monthlyBreakdown = [];
  let accumulatedInvestment = 0;
  let accumulatedGambling = 0;

  for (let month = 1; month <= Math.min(currentProjection.months, 12); month++) {
    accumulatedGambling += averageMonthlyGambling;
    accumulatedInvestment = (accumulatedInvestment + averageMonthlyGambling) * (1 + investmentReturn);
    
    monthlyBreakdown.push({
      month,
      gambling: accumulatedGambling,
      investment: accumulatedInvestment,
      difference: accumulatedInvestment - accumulatedGambling
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Projeções Financeiras</Text>
            <Text style={styles.subtitle}>Veja quanto você ganharia investindo</Text>
          </View>
        </View>

        {/* Period Selection */}
        <View style={styles.periodSection}>
          <Text style={styles.periodTitle}>Período da Projeção</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodScroll}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.id && styles.periodButtonActive
                ]}
                onPress={() => setSelectedPeriod(period.id)}
              >
                <Text style={[
                  styles.periodButtonText,
                  selectedPeriod === period.id && styles.periodButtonTextActive
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Main Projection Card */}
        <View style={styles.mainProjectionCard}>
          <View style={styles.projectionHeader}>
            <View style={styles.projectionIcon}>
              <Ionicons name="analytics" size={24} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.projectionTitle}>Sua Economia Potencial</Text>
              <Text style={styles.projectionSubtitle}>
                Em {periods.find(p => p.id === selectedPeriod)?.label}
              </Text>
            </View>
          </View>
          
          <View style={styles.projectionValueContainer}>
            <Text style={styles.projectionValue}>
              {formatCurrency(currentProjection.difference)}
            </Text>
            <Text style={styles.projectionPercentage}>
              +{currentProjection.profitability.toFixed(1)}% de rentabilidade
            </Text>
          </View>
        </View>

        {/* Comparison Cards */}
        <View style={styles.comparisonSection}>
          <Text style={styles.sectionTitle}>Comparação Detalhada</Text>
          {projectionComparisons.map((comparison, index) => (
            <View key={index} style={styles.comparisonCard}>
              <View style={[styles.comparisonIcon, { backgroundColor: comparison.backgroundColor }]}>
                <Ionicons name={comparison.icon as any} size={20} color={comparison.color} />
              </View>
              <View style={styles.comparisonContent}>
                <Text style={styles.comparisonTitle}>{comparison.title}</Text>
                <Text style={[styles.comparisonValue, { color: comparison.color }]}>
                  {formatCurrency(comparison.value)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Investment Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opções de Investimento</Text>
          {investmentOptions.map((option, index) => (
            <View key={index} style={styles.investmentCard}>
              <View style={styles.investmentHeader}>
                <View style={[styles.investmentIcon, { backgroundColor: option.color }]}>
                  <Ionicons name="trending-up" size={16} color="#FFFFFF" />
                </View>
                <View style={styles.investmentInfo}>
                  <Text style={styles.investmentName}>{option.name}</Text>
                  <Text style={styles.investmentDescription}>{option.description}</Text>
                </View>
                <View style={styles.investmentReturn}>
                  <Text style={styles.investmentReturnText}>{option.returnRate}</Text>
                  <Text style={styles.investmentRisk}>Risco {option.risk}</Text>
                </View>
              </View>
              <View style={styles.investmentProjection}>
                <Text style={styles.investmentProjectionLabel}>
                  Valor projetado em {periods.find(p => p.id === selectedPeriod)?.label}:
                </Text>
                <Text style={[styles.investmentProjectionValue, { color: option.color }]}>
                  {formatCurrency(option.projectedValue)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Monthly Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evolução Mensal</Text>
          <View style={styles.breakdownContainer}>
            {monthlyBreakdown.map((item) => (
              <View key={item.month} style={styles.breakdownItem}>
                <View style={styles.breakdownMonth}>
                  <Text style={styles.breakdownMonthText}>{item.month}º mês</Text>
                </View>
                <View style={styles.breakdownValues}>
                  <View style={styles.breakdownValue}>
                    <Text style={styles.breakdownLabel}>Apostas</Text>
                    <Text style={[styles.breakdownAmount, { color: '#EF4444' }]}>
                      {formatCurrency(item.gambling)}
                    </Text>
                  </View>
                  <View style={styles.breakdownValue}>
                    <Text style={styles.breakdownLabel}>Investimento</Text>
                    <Text style={[styles.breakdownAmount, { color: '#10B981' }]}>
                      {formatCurrency(item.investment)}
                    </Text>
                  </View>
                  <View style={styles.breakdownValue}>
                    <Text style={styles.breakdownLabel}>Diferença</Text>
                    <Text style={[styles.breakdownAmount, { color: '#3B82F6' }]}>
                      +{formatCurrency(item.difference)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <View style={styles.ctaIcon}>
              <Ionicons name="shield-checkmark" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.ctaTitle}>Proteja seu futuro financeiro</Text>
            <Text style={styles.ctaDescription}>
              Ative a proteção anti-apostas e veja seu dinheiro crescer de forma segura
            </Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => {
                // Navegar para o TabNavigator e depois para a aba Mais
                goBack(); // Volta para o dashboard primeiro
              }}
            >
              <Text style={styles.ctaButtonText}>Ativar Proteção</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
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
  header: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  periodSection: {
    padding: 16,
  },
  periodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  periodScroll: {
    flexDirection: 'row',
  },
  periodButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  periodButtonActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  periodButtonText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  mainProjectionCard: {
    backgroundColor: '#10B981',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
  },
  projectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  projectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  projectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  projectionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  projectionValueContainer: {
    alignItems: 'center',
  },
  projectionValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  projectionPercentage: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  comparisonSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  comparisonCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  comparisonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  comparisonContent: {
    flex: 1,
  },
  comparisonTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  comparisonValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
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
    alignItems: 'center',
    marginBottom: 12,
  },
  investmentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
  investmentDescription: {
    fontSize: 12,
    color: '#666666',
  },
  investmentReturn: {
    alignItems: 'flex-end',
  },
  investmentReturnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  investmentRisk: {
    fontSize: 12,
    color: '#666666',
  },
  investmentProjection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  investmentProjectionLabel: {
    fontSize: 12,
    color: '#666666',
    flex: 1,
  },
  investmentProjectionValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  breakdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  breakdownMonth: {
    width: 60,
    marginRight: 16,
  },
  breakdownMonthText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  breakdownValues: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownValue: {
    alignItems: 'center',
    flex: 1,
  },
  breakdownLabel: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 4,
  },
  breakdownAmount: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  ctaSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  ctaCard: {
    backgroundColor: '#000000',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  ctaIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ProjectionsScreen;