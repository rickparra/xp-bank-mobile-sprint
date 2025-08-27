import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

const ProtectionScreen = () => {
  const { user, logout } = useAuth();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [protectionEnabled, setProtectionEnabled] = useState(true);
  const [autoInvestEnabled, setAutoInvestEnabled] = useState(true);
  const [showBalance, setShowBalance] = useState(true);

  // Dados simulados de tentativas bloqueadas
  const blockedAttempts = [
    {
      id: '1',
      site: 'betano.com',
      amount: 150.00,
      date: '2024-01-15',
      time: '14:30',
      status: 'blocked',
      redirected: true
    },
    {
      id: '2',
      site: 'sportingbet.com',
      amount: 300.00,
      date: '2024-01-14',
      time: '20:15',
      status: 'blocked',
      redirected: true
    },
    {
      id: '3',
      site: 'bet365.com',
      amount: 89.90,
      date: '2024-01-13',
      time: '16:45',
      status: 'blocked',
      redirected: true
    }
  ];

  // Estatísticas de proteção
  const protectionStats = {
    totalBlocked: 3,
    totalProtected: 539.90,
    monthlySavings: 1200.00,
    totalInvested: 2500.00
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: logout },
      ]
    );
  };

  const securityOptions = [
    {
      icon: 'finger-print',
      title: 'Biometria',
      description: 'Use sua digital ou Face ID para acessar o app',
      value: biometricEnabled,
      onToggle: setBiometricEnabled,
    },
    {
      icon: 'notifications',
      title: 'Notificações de segurança',
      description: 'Receba alertas sobre movimentações na sua conta',
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      icon: 'location',
      title: 'Localização',
      description: 'Permitir acesso à localização para maior segurança',
      value: locationEnabled,
      onToggle: setLocationEnabled,
    },
  ];

  const menuItems = [
    {
      icon: 'person',
      title: 'Meus dados',
      description: 'Visualizar e editar informações pessoais',
      color: '#3B82F6',
      action: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
    },
    {
      icon: 'shield-checkmark',
      title: 'Segurança',
      description: 'Configurações de segurança da conta',
      color: '#10B981',
      action: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
    },
    {
      icon: 'card',
      title: 'Limites e permissões',
      description: 'Gerencie limites de transações',
      color: '#F59E0B',
      action: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
    },
    {
      icon: 'help-circle',
      title: 'Central de ajuda',
      description: 'Tire suas dúvidas e encontre suporte',
      color: '#8B5CF6',
      action: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
    },
    {
      icon: 'document-text',
      title: 'Termos e políticas',
      description: 'Leia nossos termos de uso e políticas',
      color: '#6B7280',
      action: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
    },
    {
      icon: 'star',
      title: 'Avaliar o app',
      description: 'Conte-nos o que achou do XBank',
      color: '#EF4444',
      action: () => Alert.alert('Obrigado!', 'Sua opinião é muito importante para nós'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Proteção Anti-Apostas</Text>
          <Text style={styles.subtitle}>Seu dinheiro protegido automaticamente</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitial}>
              {user?.name?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <Text style={styles.userCpf}>CPF: {user?.cpf}</Text>
          </View>
          <View style={styles.protectionBadge}>
            <Ionicons name="shield-checkmark" size={20} color="#10B981" />
            <Text style={styles.protectionText}>Protegido</Text>
          </View>
        </View>

        {/* Protection Status Card */}
        <View style={styles.protectionStatusCard}>
          <View style={styles.protectionStatusHeader}>
            <View style={styles.protectionStatusLeft}>
              <View style={[styles.protectionIcon, { backgroundColor: protectionEnabled ? '#10B981' : '#EF4444' }]}>
                <Ionicons name="shield-checkmark" size={24} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.protectionStatusTitle}>
                  {protectionEnabled ? 'Proteção Anti-Apostas Ativa' : 'Proteção Desativada'}
                </Text>
                <Text style={styles.protectionStatusSubtitle}>
                  {protectionEnabled ? 'Sistema funcionando perfeitamente' : 'Seu dinheiro pode estar em risco'}
                </Text>
              </View>
            </View>
            <Switch
              value={protectionEnabled}
              onValueChange={setProtectionEnabled}
              trackColor={{ false: '#E5E5E5', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Protection Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="close-circle" size={20} color="#EF4444" />
              </View>
              <Text style={styles.statValue}>{protectionStats.totalBlocked}</Text>
              <Text style={styles.statLabel}>Tentativas Bloqueadas</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="shield-checkmark" size={20} color="#10B981" />
              </View>
              <Text style={[styles.statValue, { color: '#10B981' }]}>
                {formatCurrency(protectionStats.totalProtected)}
              </Text>
              <Text style={styles.statLabel}>Valor Protegido</Text>
            </View>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="save" size={20} color="#3B82F6" />
              </View>
              <Text style={[styles.statValue, { color: '#3B82F6' }]}>
                {formatCurrency(protectionStats.monthlySavings)}
              </Text>
              <Text style={styles.statLabel}>Economia Mensal</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#E0E7FF' }]}>
                <Ionicons name="trending-up" size={20} color="#8B5CF6" />
              </View>
              <Text style={[styles.statValue, { color: '#8B5CF6' }]}>
                {formatCurrency(protectionStats.totalInvested)}
              </Text>
              <Text style={styles.statLabel}>Total Investido</Text>
            </View>
          </View>
        </View>

        {/* Protection Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações de Proteção</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="trending-up" size={20} color="#3B82F6" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Investimento Automático</Text>
                <Text style={styles.settingDescription}>Redireciona valores para investimentos</Text>
              </View>
            </View>
            <Switch
              value={autoInvestEnabled}
              onValueChange={setAutoInvestEnabled}
              trackColor={{ false: '#E5E5E5', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="shield-checkmark" size={20} color="#10B981" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Notificações de Proteção</Text>
                <Text style={styles.settingDescription}>Alertas de tentativas bloqueadas</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E5E5E5', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Blocked Attempts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tentativas Bloqueadas</Text>
          {blockedAttempts.map((attempt) => (
            <View key={attempt.id} style={styles.blockedAttemptItem}>
              <View style={styles.blockedAttemptHeader}>
                <View style={styles.blockedAttemptLeft}>
                  <View style={styles.blockedAttemptIcon}>
                    <Ionicons name="close-circle" size={16} color="#EF4444" />
                  </View>
                  <View>
                    <Text style={styles.blockedAttemptSite}>{attempt.site}</Text>
                    <Text style={styles.blockedAttemptDate}>
                      {formatDate(attempt.date)} às {attempt.time}
                    </Text>
                  </View>
                </View>
                <View style={styles.blockedAttemptRight}>
                  <Text style={styles.blockedAttemptAmount}>
                    {formatCurrency(attempt.amount)}
                  </Text>
                  <View style={styles.blockedAttemptStatus}>
                    <Text style={styles.blockedAttemptStatusText}>
                      {attempt.redirected ? 'Redirecionado' : 'Bloqueado'}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.blockedAttemptFooter}>
                <View style={styles.blockedAttemptInfo}>
                  <Ionicons name="warning" size={12} color="#F59E0B" />
                  <Text style={styles.blockedAttemptInfoText}>Site de apostas detectado</Text>
                </View>
                <View style={styles.blockedAttemptInfo}>
                  <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                  <Text style={styles.blockedAttemptInfoText}>Valor investido automaticamente</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como Funciona a Proteção</Text>
          <View style={styles.howItWorksContent}>
            <View style={styles.howItWorksIcon}>
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
            </View>
            <View style={styles.howItWorksText}>
              <Text style={styles.howItWorksItem}>• Monitoramos todas as suas transferências PIX</Text>
              <Text style={styles.howItWorksItem}>• Sites de apostas são detectados automaticamente</Text>
              <Text style={styles.howItWorksItem}>• Valores são bloqueados e redirecionados para investimentos</Text>
              <Text style={styles.howItWorksItem}>• Você recebe notificações de todas as ações</Text>
              <Text style={styles.howItWorksItem}>• Seu dinheiro fica seguro e rendendo</Text>
            </View>
          </View>
        </View>

        {/* Security Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações de Segurança</Text>
          {securityOptions.map((option, index) => (
            <View key={index} style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Ionicons name={option.icon as any} size={20} color="#000000" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{option.title}</Text>
                  <Text style={styles.settingDescription}>{option.description}</Text>
                </View>
              </View>
              <Switch
                value={option.value}
                onValueChange={option.onToggle}
                trackColor={{ false: '#E5E5E5', true: '#000000' }}
                thumbColor="#FFFFFF"
              />
            </View>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mais opções</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.action}>
              <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon as any} size={20} color="#FFFFFF" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#666666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>XBank Mobile v1.0.0</Text>
          <Text style={styles.appDescription}>
            Seu banco digital seguro e prático
          </Text>
          <Text style={styles.appCopyright}>
            © 2024 XBank. Todos os direitos reservados.
          </Text>
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
  userCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  userCpf: {
    fontSize: 12,
    color: '#666666',
  },
  protectionBadge: {
    alignItems: 'center',
  },
  protectionText: {
    fontSize: 10,
    color: '#10B981',
    marginTop: 2,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#666666',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    color: '#666666',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  appVersion: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 10,
    color: '#999999',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
  // Novos estilos para proteção anti-apostas
  protectionStatusCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
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
  protectionStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  protectionStatusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  protectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  protectionStatusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  protectionStatusSubtitle: {
    fontSize: 12,
    color: '#666666',
  },
  statsContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
  },
  blockedAttemptItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  blockedAttemptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  blockedAttemptLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  blockedAttemptIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  blockedAttemptSite: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  blockedAttemptDate: {
    fontSize: 12,
    color: '#666666',
  },
  blockedAttemptRight: {
    alignItems: 'flex-end',
  },
  blockedAttemptAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  blockedAttemptStatus: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  blockedAttemptStatusText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '500',
  },
  blockedAttemptFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blockedAttemptInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  blockedAttemptInfoText: {
    fontSize: 10,
    color: '#666666',
    marginLeft: 4,
  },
  howItWorksContent: {
    flexDirection: 'row',
    padding: 16,
  },
  howItWorksIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  howItWorksText: {
    flex: 1,
  },
  howItWorksItem: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 4,
  },
});

export default ProtectionScreen;