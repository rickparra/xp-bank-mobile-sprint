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

const CardsScreen = () => {
  const cards = [
    {
      id: '1',
      type: 'credit',
      brand: 'Mastercard',
      number: '**** **** **** 1234',
      name: 'XBank Platinum',
      limit: 5000,
      used: 1200,
      color: '#000000',
    },
    {
      id: '2',
      type: 'debit',
      brand: 'Visa',
      number: '**** **** **** 5678',
      name: 'XBank Débito',
      color: '#3B82F6',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader 
        title="Meus Cartões"
        subtitle="Gerencie seus cartões de débito e crédito"
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* Cards List */}
        <View style={styles.cardsContainer}>
          {cards.map((card) => (
            <View key={card.id} style={[styles.cardItem, { backgroundColor: card.color }]}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardBrand}>{card.brand}</Text>
                <Ionicons name="card" size={32} color="#FFFFFF" />
              </View>
              
              <View style={styles.cardBody}>
                <Text style={styles.cardNumber}>{card.number}</Text>
                <Text style={styles.cardName}>{card.name}</Text>
                <Text style={styles.cardType}>
                  {card.type === 'credit' ? 'Cartão de Crédito' : 'Cartão de Débito'}
                </Text>
              </View>

              {card.type === 'credit' && (
                <View style={styles.cardFooter}>
                  <View style={styles.limitInfo}>
                    <Text style={styles.limitLabel}>Limite disponível</Text>
                    <Text style={styles.limitAmount}>
                      {formatCurrency(card.limit! - card.used!)}
                    </Text>
                  </View>
                  <View style={styles.limitBar}>
                    <View 
                      style={[
                        styles.limitProgress, 
                        { width: `${(card.used! / card.limit!) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.limitDetails}>
                    Usado: {formatCurrency(card.used!)} de {formatCurrency(card.limit!)}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Ações rápidas</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIcon}>
              <Ionicons name="lock-closed" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Bloquear cartão</Text>
              <Text style={styles.actionDescription}>Bloqueie temporariamente seus cartões</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="eye" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Ver dados do cartão</Text>
              <Text style={styles.actionDescription}>Consulte informações completas</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: '#F59E0B' }]}>
              <Ionicons name="receipt" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Fatura do cartão</Text>
              <Text style={styles.actionDescription}>Visualize e pague sua fatura</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.newCardButton}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
          <Text style={styles.newCardText}>Solicitar Novo Cartão</Text>
        </TouchableOpacity>

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

  cardsContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  cardItem: {
    width: width - 32,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardBrand: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardBody: {
    marginBottom: 20,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 8,
  },
  cardName: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 4,
  },
  cardType: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 16,
  },
  limitInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  limitLabel: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  limitAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  limitBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  limitProgress: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  limitDetails: {
    fontSize: 10,
    color: '#CCCCCC',
  },
  actionsSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  actionItem: {
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
  newCardButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  newCardText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default CardsScreen;