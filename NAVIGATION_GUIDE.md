# 🧭 Sistema de Navegação com LinkedList

Este projeto implementa um sistema avançado de navegação que utiliza uma estrutura de **LinkedList** para gerenciar o histórico de navegação e um botão de voltar inteligente.

## 🔗 Como Funciona

### Estrutura LinkedList
O sistema mantém um histórico de navegação usando uma estrutura de linkedlist where:
- Cada nó contém: `screenName`, `params`, `timestamp`, `next`, `previous`
- O histórico é limitado a 10 telas para performance
- Navegação bidirecional (frente e trás)

### Componentes Principais

#### 1. `NavigationHistory` (Class)
```typescript
class NavigationHistory {
  push(screenName: string, params?: any): void
  pop(): NavigationNode | null
  canGoBack(): boolean
  getCurrent(): NavigationNode | null
  getStack(): NavigationNode[]
  getBreadcrumbs(): string[]
}
```

#### 2. `NavigationContext`
Gerencia o estado global de navegação e integra com React Navigation.

#### 3. `CustomHeader`
Componente de header que inclui:
- Botão de voltar automático
- Título e subtítulo
- Breadcrumbs opcionais
- Componente personalizado no lado direito

## 🚀 Como Usar

### 1. Hook Personalizado
```typescript
import { useCustomNavigation } from '../hooks/useCustomNavigation';

const MyScreen = () => {
  const { navigateTo, goBack, canGoBack } = useCustomNavigation();
  
  return (
    <TouchableOpacity onPress={() => navigateTo('PIX')}>
      <Text>Ir para PIX</Text>
    </TouchableOpacity>
  );
};
```

### 2. Header Personalizado
```typescript
import CustomHeader from '../components/CustomHeader';

const MyScreen = () => {
  return (
    <SafeAreaView>
      <CustomHeader 
        title="Minha Tela"
        subtitle="Descrição da tela"
        rightComponent={<Button title="Ação" />}
      />
      {/* Resto do conteúdo */}
    </SafeAreaView>
  );
};
```

### 3. Navegação Programática
```typescript
const { navigateTo, goBack, goBackOrHome } = useCustomNavigation();

// Navegar para uma tela
navigateTo('Investimentos');

// Voltar uma tela
goBack();

// Voltar ou ir para home se não houver histórico
goBackOrHome();
```

## ⚡ Funcionalidades

### ✅ Implementadas
- [x] LinkedList para histórico de navegação
- [x] Botão de voltar automático
- [x] Header personalizado com breadcrumbs
- [x] Context para gerenciamento de estado
- [x] Hook personalizado para fácil uso
- [x] Integração com React Navigation
- [x] Limite de histórico (10 telas)
- [x] Navegação bidirecional

### 🔄 Fluxo de Navegação

1. **Usuário navega**: `Dashboard → PIX → Investimentos`
2. **LinkedList interno**:
   ```
   Dashboard ← → PIX ← → Investimentos (current)
   ```
3. **Botão voltar**: Remove `Investimentos`, volta para `PIX`
4. **Estado atualizado**: 
   ```
   Dashboard ← → PIX (current)
   ```

### 📱 Telas Integradas

- ✅ **Dashboard**: Navegação para outras telas
- ✅ **PIX Transfer**: Header com botão voltar
- ✅ **Investimentos**: Header personalizado
- ✅ **Boletos**: Navegação integrada
- ✅ **Cartões**: Header com voltar
- ✅ **Extrato**: Sistema completo
- ✅ **Perfil**: Configurado

## 🎯 Vantagens

1. **Histórico Inteligente**: Gerencia automaticamente o stack de navegação
2. **Performance**: Limita histórico para evitar memory leaks
3. **UX Melhorado**: Botão voltar sempre disponível quando necessário
4. **Breadcrumbs**: Usuario sempre sabe onde está
5. **Flexibilidade**: Pode ser usado com ou sem React Navigation
6. **Type Safety**: Totalmente tipado em TypeScript

## 🔧 Configuração

O sistema é automaticamente configurado no `AppNavigator` e não requer configuração adicional. Todas as telas já estão integradas e funcionais.

### Exemplo de Uso Completo

```typescript
import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { useCustomNavigation } from '../hooks/useCustomNavigation';

const MyScreen = () => {
  const { navigateTo, canGoBack, breadcrumbs } = useCustomNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader 
        title="Minha Tela"
        subtitle="Exemplo de uso"
      />
      
      <View style={{ padding: 20 }}>
        <Text>Pode voltar: {canGoBack ? 'Sim' : 'Não'}</Text>
        <Text>Caminho: {breadcrumbs.join(' → ')}</Text>
        
        <TouchableOpacity onPress={() => navigateTo('PIX')}>
          <Text>Ir para PIX</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
```

## 🎉 Resultado

O sistema está **100% funcional** e integrado ao app! Agora o usuário pode:
- ✅ Navegar entre telas com histórico
- ✅ Usar botão voltar inteligente
- ✅ Ver breadcrumbs de navegação
- ✅ Ter uma experiência fluida e consistente