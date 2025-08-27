# XBank Mobile - React Native

Aplicativo bancário móvel desenvolvido em React Native com TypeScript, migrado do projeto web `secure-piggy-bank`.

## 🚀 Funcionalidades

- **Autenticação**: Login com email e senha
- **Dashboard**: Visão geral da conta com saldo e ações rápidas
- **PIX**: Transferências via PIX
- **Investimentos**: Visualização e gestão de investimentos
- **Boletos**: Pagamento de contas e boletos
- **Cartões**: Gerenciamento de cartões de débito e crédito
- **Extrato**: Histórico completo de transações
- **Perfil**: Configurações de segurança e dados do usuário

## 📱 Tecnologias Utilizadas

- React Native
- TypeScript
- Expo
- React Navigation 6
- AsyncStorage
- Expo Vector Icons

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd xp-bank-mobile
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

4. Use o Expo Go no seu celular ou execute em um emulador:
   - iOS: `npm run ios`
   - Android: `npm run android`

## 👥 Usuários de Teste

Para testar o aplicativo, use uma das seguintes contas:

**Usuário 1:**
- Email: `joao@email.com`
- Senha: `123456`

**Usuário 2:**
- Email: `maria@email.com`
- Senha: `123456`

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
├── contexts/            # Context API (autenticação)
├── navigation/          # Configuração de navegação
├── screens/            # Telas do aplicativo
├── types/              # Tipos TypeScript
└── utils/              # Utilitários e helpers
```

## 🔄 Migração do Web para Mobile

Este projeto foi migrado do projeto web `secure-piggy-bank` para React Native, mantendo:

- ✅ Todas as funcionalidades principais
- ✅ Design system adaptado para mobile
- ✅ Estrutura de autenticação
- ✅ Navegação entre telas
- ✅ Gerenciamento de estado
- ✅ TypeScript para type safety

## 🎨 Design

O aplicativo segue as diretrizes de design mobile-first com:

- Interface limpa e moderna
- Cores consistentes (preto, branco, cinza)
- Ícones intuitivos
- Navegação por abas
- Feedback visual para ações do usuário

## 🔐 Segurança

- Autenticação local com AsyncStorage
- Dados mock para demonstração
- Validação de formulários
- Estados de loading e erro

## 📝 Próximos Passos

- [ ] Integração com API real
- [ ] Implementação de biometria
- [ ] Push notifications
- [ ] Modo offline
- [ ] Testes unitários e E2E
- [ ] CI/CD pipeline

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.