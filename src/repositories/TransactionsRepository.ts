import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const prevIncome = this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        return transaction.value;
      }
      return 0;
    });
    const prevOutcome = this.transactions.map(transaction => {
      if (transaction.type === 'outcome') {
        return transaction.value;
      }
      return 0;
    });
    const income = prevIncome.reduce((sum, value) => {
      return sum + value;
    }, 0);

    const outcome = prevOutcome.reduce((sum, value) => {
      return sum + value;
    }, 0);
    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
