import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';

const BillsScreen = () => {
  const bills = [
    {
      id: '1',
      name: 'Energia Elétrica',
      company: 'EDP São Paulo',
      amount: 152.30,
      dueDate: '2024-01-25',
      status: 'pending',
      barcode: '12345678901234567890123456789012345678901234567890',
    },
    {
      id: '2',
      name: 'Internet Fibra',
      company: 'Vivo Fibra',
      amount: 89.90,
      dueDate: '2024-01-28',
      status: 'pending',
      barcode: '98765432109876543210987654321098765432109876543210',
    },
    {
      id: '3',
      name: 'Cartão de Crédito',
      company: 'XBank Card',
      amount: 890.50,
      dueDate: '2024-01-20',
      status: 'paid',
      barcode: '11111111111111111111111111111111111111111111111111',
    },
    {
      id: '4',
      name: 'Financiamento Imóvel',
      company: 'Caixa Econômica',
      amount: 1250.00,
      dueDate: '2024-01-30',
      status: 'pending',
      barcode: '22222222222222222222222222222222222222222222222222',
    }
  ];

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

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateColor = (dueDate: string, status: string) => {
    if (status === 'paid') return '#10B981';
    
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return '#EF4444';
    if (days <= 3) return '#F59E0B';
    return '#666666';
  };

  const getDueDateText = (dueDate: string, status: string) => {
    if (status === 'paid') return 'Pago';
    
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return 'Vencido';
    if (days === 0) return 'Vence hoje';
    if (days === 1) return 'Vence amanhã';
    return `${days} dias`;
  };

  const handlePayBill = (bill: any) => {
    Alert.alert(
      'Confirmar Pagamento',
      `Pagar ${bill.name} no valor de ${formatCurrency(bill.amount)}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Pagar', 
          onPress: () => {
            Alert.alert('Sucesso', 'Boleto pago com sucesso!');
          }
        },
      ]
    );
  };

  const pendingBills = bills.filter(bill => bill.status === 'pending');
  const totalPending = pendingBills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader 
        title="Boletos e Contas"
        subtitle="Pague suas contas de forma simples"
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total a pagar</Text>
          <Text style={styles.summaryAmount}>{formatCurrency(totalPending)}</Text>
          <Text style={styles.summaryCount}>
            {pendingBills.length} conta{pendingBills.length !== 1 ? 's' : ''} pendente{pendingBills.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="scan" size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>Escanear</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>Digitar Código</Text>
          </TouchableOpacity>
        </View>

        {/* Bills List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suas contas</Text>
          {bills.map((bill) => (
            <View key={bill.id} style={styles.billCard}>
              <View style={styles.billHeader}>
                <View style={styles.billInfo}>
                  <Text style={styles.billName}>{bill.name}</Text>
                  <Text style={styles.billCompany}>{bill.company}</Text>
                  <Text style={styles.billAmount}>{formatCurrency(bill.amount)}</Text>
                </View>
                <View style={styles.billStatus}>
                  <Text 
                    style={[
                      styles.dueDateText,
                      { color: getDueDateColor(bill.dueDate, bill.status) }
                    ]}
                  >
                    {getDueDateText(bill.dueDate, bill.status)}
                  </Text>
                  <Text style={styles.dueDateLabel}>
                    Venc. {formatDate(bill.dueDate)}
                  </Text>
                </View>
              </View>
              
              {bill.status === 'pending' && (
                <TouchableOpacity 
                  style={styles.payButton}
                  onPress={() => handlePayBill(bill)}
                >
                  <Text style={styles.payButtonText}>Pagar Agora</Text>
                </TouchableOpacity>
              )}
              
              {bill.status === 'paid' && (
                <View style={styles.paidBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.paidText}>Pago</Text>
                </View>
              )}
            </View>
          ))}
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

  summaryCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
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
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 4,
  },
  summaryCount: {
    fontSize: 12,
    color: '#666666',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  billCard: {
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
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  billInfo: {
    flex: 1,
  },
  billName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  billCompany: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  billAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  billStatus: {
    alignItems: 'flex-end',
  },
  dueDateText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  dueDateLabel: {
    fontSize: 12,
    color: '#666666',
  },
  payButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  paidText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default BillsScreen;