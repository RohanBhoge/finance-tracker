const filterTransactionsByPeriod = (transactions, period) => {
    const now = new Date();
    let startDate;

    if (period === 'weekly') {
        startDate = new Date(now.setDate(now.getDate() - 7));
    } else if (period === 'monthly') {
        startDate = new Date(now.setMonth(now.getMonth() - 1));
    } else if (period === 'yearly') {
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
    } else { 
        return transactions;
    }
    
    return transactions.filter(t => new Date(t.date) >= startDate);
};

export { filterTransactionsByPeriod };