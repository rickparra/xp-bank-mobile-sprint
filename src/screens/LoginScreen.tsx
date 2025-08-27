import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async () => {
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password);
      if (!success) {
        setError('Email ou senha incorretos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Logo e Título */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="shield" size={40} color="#FFFFFF" />
              </View>
              <Text style={styles.logoText}>XBank</Text>
              <Text style={styles.subtitle}>Seu banco digital seguro</Text>
            </View>

            {/* Card de Login */}
            <View style={styles.loginCard}>
              <Text style={styles.cardTitle}>Acesse sua conta</Text>
              
              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={20} color="#666666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    placeholderTextColor="#999999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Senha</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#666666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#999999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons 
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                      size={20} 
                      color="#666666" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? 'Entrando...' : 'Entrar'}
                </Text>
              </TouchableOpacity>

              {/* Error Message */}
              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              {/* Credenciais Demo */}
              <View style={styles.demoContainer}>
                <Text style={styles.demoTitle}>Credenciais de Demonstração:</Text>
                <View style={styles.demoRow}>
                  <Text style={styles.demoLabel}>Email:</Text>
                  <Text style={styles.demoValue}>joao@email.com</Text>
                </View>
                <View style={styles.demoRow}>
                  <Text style={styles.demoLabel}>Senha:</Text>
                  <Text style={styles.demoValue}>123456</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.demoRow}>
                  <Text style={styles.demoLabel}>Email:</Text>
                  <Text style={styles.demoValue}>maria@email.com</Text>
                </View>
                <View style={styles.demoRow}>
                  <Text style={styles.demoLabel}>Senha:</Text>
                  <Text style={styles.demoValue}>123456</Text>
                </View>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                © 2024 XBank. Todos os direitos reservados.
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
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  content: {
    paddingHorizontal: 16,
    maxWidth: width > 400 ? 400 : width - 32,
    alignSelf: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
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
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    height: 44,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    height: '100%',
  },
  eyeButton: {
    padding: 4,
  },
  loginButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    textAlign: 'center',
  },
  demoContainer: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 12,
  },
  demoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  demoLabel: {
    fontSize: 12,
    color: '#666666',
  },
  demoValue: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#000000',
    fontWeight: '500',
  },
  separator: {
    height: 8,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default LoginScreen;