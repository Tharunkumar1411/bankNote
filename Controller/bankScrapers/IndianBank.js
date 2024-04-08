
function processTransactions(rows) {
    const transactions = [];
    let currentTransaction = {};

    var phonePe = 0;

    rows.forEach((row) => {
        if (row[0] && row[0].match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            if (currentTransaction.date) {
                transactions.push(currentTransaction);
                currentTransaction = {};
            }
            currentTransaction.date = row[0];
            currentTransaction.particulars = row[1].split('/').pop();
            currentTransaction.withdrawals = row[2];
            currentTransaction.deposit = row[3];
            currentTransaction.balance = row[4];
        } else if (currentTransaction.date && row[0]) {
            currentTransaction.particulars = row.join(',').split('/').pop();
        }
    });

    function categorizeTransactions(transactions) {
        const categories = {};
        transactions.forEach(transaction => {
          const category = transaction.particulars.toLowerCase().trim();
          const amount = parseFloat(transaction.withdrawals);
          if (!isNaN(amount)) {
            if (categories[category]) {
              categories[category] += amount;
            } else {
              categories[category] = amount;
            }
          }
        });
        return categories;
      }
      
      function calculateTotalExpenses(categories) {
        let total = 0;
        for (const category in categories) {
          total += categories[category];
        }
        return total;
      }
      
      // Analyze expenses
      const categorizedExpenses = categorizeTransactions(transactions);
      const totalExpenses = calculateTotalExpenses(categorizedExpenses);
      
      // Print the analysis
      console.log("Expense Analysis:");
      console.log("-----------------");
      for (const category in categorizedExpenses) {
        console.log(`${category}: ${categorizedExpenses[category]}`);
      }
      console.log("-----------------");
      console.log(`Total Expenses: ${totalExpenses}`);
      
    return transactions;
}

module.exports = {processTransactions}