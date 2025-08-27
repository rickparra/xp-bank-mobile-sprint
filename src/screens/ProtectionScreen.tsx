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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const ProtectionScreen = () => {
  const { user, logout } = useAuth();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);

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
          <Text style={styles.title}>Perfil e Proteção</Text>
          <Text style={styles.subtitle}>Gerencie sua conta e configurações</Text>
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
});

export default ProtectionScreen;