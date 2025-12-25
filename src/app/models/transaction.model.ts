export interface Transaction {
  id?: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId?: string;
  date: string;
}
