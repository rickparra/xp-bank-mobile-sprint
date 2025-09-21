# 🏦 XBank Mobile - Banco Digital com Proteção Anti-Apostas

Aplicativo bancário móvel desenvolvido em React Native com sistema inovador de proteção contra apostas online.

## 👥 Equipe de Desenvolvimento

Este projeto é desenvolvido por estudantes da FIAP da 3ESPV:

- **Henrique Parra Benitez** (RM551973) - 3ESPV  

- **Roberto Oliveira Azzalin Navas** (RM551460) - 3ESPV  

- **Tony Willian da Silva Segalin** (RM550667) - 3ESPV  

- **Guilherme Barreto** (RM98939) - 3ESPV  

- **Nicolas Oliveira** (RM550667) - 3ESPV  


## 🚀 Funcionalidades

### 🔐 **Autenticação**
- Login com email e senha
- Sessão persistente
- Credenciais de teste disponíveis na tela

### 🏠 **Dashboard**
- Visualizar saldo da conta (com opção ocultar/mostrar)
- Ver últimas transações
- Acesso rápido a todas as funcionalidades
- Preview de projeções financeiras

### 💸 **PIX com Proteção Anti-Apostas** ⭐
- Transferências PIX normais
- **Detecção automática** de sites de apostas (15+ sites monitorados)
- **Bloqueio automático** de transferências para casas de apostas
- **Redirecionamento automático** para investimentos
- Alertas educativos sobre proteção financeira

### 📈 **Investimentos**
- Portfólio com 4 tipos de investimentos:
  - Tesouro Selic 2029 (13,75% a.a.)
  - CDB XBank Premium (14,2% a.a.)
  - Fundo Multimercado (18,5% a.a.)
  - XBank Cripto (25,8% a.a.)
- Visualizar rentabilidade em tempo real
- Total investido e patrimônio consolidado

### 💳 **Cartões**
- Gerenciar cartões de crédito e débito
- Visualizar limite disponível
- Ações de segurança (bloqueio, consulta de dados)
- Gestão de faturas

### 📊 **Projeções Financeiras**
- Simulador "Apostas vs Investimentos"
- Períodos: 6 meses, 1 ano, 2 anos, 5 anos
- Evolução mensal detalhada
- Cálculos com juros compostos

### 🛡️ **Central de Proteção**
- Status da proteção em tempo real
- Estatísticas de valores protegidos
- Histórico de tentativas bloqueadas
- Configurações de segurança
- Educação sobre funcionamento da proteção

## 🎯 Como Funciona a Proteção

1. **Usuário tenta PIX** para site de apostas (ex: `pagamento@betano.com`)
2. **Sistema detecta** automaticamente o domínio
3. **Alerta é exibido** explicando a proteção
4. **Valor é redirecionado** para investimentos automaticamente
5. **Confirmação** de que o dinheiro foi protegido e investido

## 👥 Usuários de Teste

**Conta 1:**
- Email: `joao@email.com`
- Senha: `123456`
- Saldo: R$ 15.750,50

**Conta 2:**
- Email: `maria@email.com`
- Senha: `123456`
- Saldo: R$ 8.320,75

## 🛠️ Instalação

```bash
# Clone o projeto
git clone <url-do-repositorio>
cd xp-bank-mobile

# Instale dependências
npm install

# Execute o projeto
npm start
```

## 🧪 Teste a Proteção

1. Faça login no app
2. Vá para a aba "PIX"
3. Use uma chave como `pagamento@betano.com`
4. Insira um valor (ex: R$ 100,00)
5. Clique em "Transferir"
6. **Veja a proteção em ação!** 🛡️

## 📱 Tecnologias

- React Native 0.79.6
- TypeScript
- Expo ~53.0.22
- React Navigation 7
- AsyncStorage

---

**XBank Mobile** - Protegendo seu futuro financeiro 🏦✨