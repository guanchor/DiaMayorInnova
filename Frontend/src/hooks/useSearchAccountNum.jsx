import HelpExampleService from '../services/HelpExampleService';
import AccountService from '../services/AccountService';
import { useEffect, useState } from 'react';

const useSearchAccountNum = (accountNumber) => {
  const [example, setExample] = useState({});
  const [account, setAccount] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!accountNumber || accountNumber.length < 4) return;

      setIsLoading(true);
      setIsError(false);

      try {
        const accountResponse = await AccountService.findByNumber(accountNumber);
        setAccount(accountResponse.data);

        const exampleResponse = await HelpExampleService.findByAccount(accountResponse.data.id);
        setExample(exampleResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountData();
  }, [accountNumber]);

  return { example, account, isLoading, isError, setIsError };
};

export default useSearchAccountNum;
