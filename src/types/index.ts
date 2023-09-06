export interface Transaction {
    feedItemUid: string;
    transactionTime: Date;
    reference: string;
    amount: {
      minorUnits: number;
    };
  }
  
export interface SavingsGoal {
    savingsGoalUid: string;
    name: string;
    target: {
        minorUnits: number;
    };
    totalSaved: {
        minorUnits: number;
    };
}

