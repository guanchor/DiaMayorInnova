import React, { useMemo } from 'react';
import './LedgerBook.css';

const LedgerBook = ({ entries, title = "Libro Mayor" }) => {
  const processedData = useMemo(() => {
    const accountsMap = new Map();
    
    entries.forEach(entry => {
      entry.annotations?.forEach(annotation => {
        const accountNumber = annotation.account_number;
        if (!accountsMap.has(accountNumber)) {
          accountsMap.set(accountNumber, {
            accountNumber,
            entries: []
          });
        }
        accountsMap.get(accountNumber).entries.push({
          entryNumber: entry.entry_number,
          debit: parseFloat(annotation.debit) || 0,
          credit: parseFloat(annotation.credit) || 0
        });
      });
    });

    // Calcular saldos y ordenar
    const accounts = Array.from(accountsMap.values()).map(account => {
      let totalDebit = 0;
      let totalCredit = 0;
      
      account.entries.forEach(entry => {
        totalDebit += entry.debit;
        totalCredit += entry.credit;
      });

      const balance = totalDebit - totalCredit;
      
      return {
        ...account,
        totalDebit,
        totalCredit,
        balance
      };
    });
    
    // Calcular totales generales
    const totalDebit = accounts.reduce((sum, acc) => sum + acc.totalDebit, 0);
    const totalCredit = accounts.reduce((sum, acc) => sum + acc.totalCredit, 0);

    return {
      accounts,
      totalDebit,
      totalCredit
    };
  }, [entries]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="ledger-book">
      <h3>{title}</h3>
      <table className="ledger-book-table">
        <thead>
          <tr>
            <th>Cuenta</th>
            <th>Asiento</th>
            <th>Debe</th>
            <th>Haber</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {processedData.accounts.map(account => (
            <React.Fragment key={account.accountNumber}>
              <tr className="ledger-book-account-totals">
                <td>{account.accountNumber}</td>
                <td></td>
                <td>{formatCurrency(account.totalDebit)}</td>
                <td>{formatCurrency(account.totalCredit)}</td>
                <td className={account.balance < 0 ? 'ledger-book-negative' : ''}>
                  {formatCurrency(account.balance)}
                </td>
              </tr>
              {account.entries.map((entry, index) => (
                <tr key={`${account.accountNumber}-${entry.entryNumber}-${index}`} className="ledger-book-entry-row">
                  <td></td>
                  <td>{entry.entryNumber}</td>
                  <td>{formatCurrency(entry.debit)}</td>
                  <td>{formatCurrency(entry.credit)}</td>
                  <td className={entry.debit - entry.credit < 0 ? 'ledger-book-negative' : ''}>
                    {formatCurrency(entry.debit - entry.credit)}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="2">Total General</th>
            <th>{formatCurrency(processedData.totalDebit)}</th>
            <th>{formatCurrency(processedData.totalCredit)}</th>
            <th className={processedData.totalDebit - processedData.totalCredit < 0 ? 'ledger-book-negative' : ''}>
              {formatCurrency(processedData.totalDebit - processedData.totalCredit)}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default LedgerBook; 