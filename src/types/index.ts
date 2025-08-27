export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  balance: number;
}

export interface Transaction {
  id: string;
  type: 'pix' | 'payment' | 'investment' | 'income';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Investment {
  id: string;
  name: string;
  type: string;
  amount: number;
  profitability: number;
  risk: 'baixo' | 'medio' | 'alto';
  description: string;
}

export interface Card {
  id: string;
  number: string;
  brand: string;
  type: 'debit' | 'credit';
  limit?: number;
  used?: number;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  barcode: string;
  status: 'pending' | 'paid';
}

export type RootStackParamList = {
  Login: undefined;
  TabNavigator: undefined;
  Dashboard: undefined;
  PIXTransfer: undefined;
  Investments: undefined;
  Bills: undefined;
  Cards: undefined;
  Transactions: undefined;
  Protection: undefined;
};