import transactionData from "./data";

export const getUserTransaction = (selectedUser) =>
  transactionData.filter((tData) => tData.name === selectedUser);

export function calculateRewards(selectedUser,startDate,endDate) {
  const userTransactions = getUserTransaction(selectedUser);
  let rewards = 0;
  userTransactions.forEach((transaction) => {
    if (
      new Date(startDate) < new Date(transaction.transactionDt) &&
      new Date(endDate) > new Date(transaction.transactionDt)
    ) {
      rewards += getRewards(transaction.amt);
    }
  });
  let row;
  if (userTransactions.length > 0) {
    row = [{ ...userTransactions[0], rewards }];
  }
  return row;
}

export const getRewards = (amount) => {
  let rewards = 0;
  if (amount > 100) {
    rewards = (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    rewards = (amount - 50) * 1;
  }
  return rewards;
};
