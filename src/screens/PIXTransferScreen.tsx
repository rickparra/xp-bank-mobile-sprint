import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';

const PIXTransferScreen = () => {
  const [pixKey, setPixKey] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const numberValue = parseFloat(numericValue) / 100;
    return numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    setAmount(numericValue);
  };

  const handleTransfer = async () => {
    if (!pixKey || !amount) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const numericAmount = parseFloat(amount) / 100;
    if (numericAmount <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return;
    }

    setLoading(true);

    // Simular delay da transferência
    setTimeout(() => {
      Alert.alert(
        'Transferência realizada',
        `PIX de ${formatCurrency(amount)} enviado com sucesso!`,
        [
          {
            text: 'OK',
            onPress: () => {
              setPixKey('');
              setAmount('');
              setDescription('');
            }
          }
        ]
      );
      setLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader 
        title="Transferência PIX"
        subtitle="Transfira dinheiro de forma rápida e segura"
      />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

          <View style={styles.content}>
            {/* PIX Key Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Chave PIX *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="key-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="CPF, e-mail, telefone ou chave aleatória"
                  placeholderTextColor="#999999"
                  value={pixKey}
                  onChangeText={setPixKey}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Amount Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Valor *</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.currencySymbol}>R$</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0,00"
                  placeholderTextColor="#999999"
                  value={amount ? formatCurrency(amount).replace('R$\xa0', '') : ''}
                  onChangeText={handleAmountChange}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Description Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Descrição (opcional)</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="chatbubble-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Adicione uma descrição"
                  placeholderTextColor="#999999"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Transfer Button */}
            <TouchableOpacity
              style={[styles.transferButton, loading && styles.transferButtonDisabled]}
              onPress={handleTransfer}
              disabled={loading}
            >
              <Text style={styles.transferButtonText}>
                {loading ? 'Processando...' : 'Transferir'}
              </Text>
            </TouchableOpacity>

            {/* Info Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoHeader}>
                <Ionicons name="information-circle" size={20} color="#3B82F6" />
                <Text style={styles.infoTitle}>Informações importantes</Text>
              </View>
              <Text style={styles.infoText}>
                • Transferências PIX são processadas instantaneamente{'\n'}
                • Disponível 24h por dia, todos os dias{'\n'}
                • Limite diário de R$ 5.000,00{'\n'}
                • Confirme sempre os dados do destinatário
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },

  content: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#000000',
    marginRight: 8,
    marginTop: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    minHeight: 20,
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  transferButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  transferButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  transferButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default PIXTransferScreen;