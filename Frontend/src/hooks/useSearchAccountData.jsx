import { useEffect, useState } from "react";
import AccountService from "../services/AccountService";
import HelpExampleService from "../services/HelpExampleService";

const useSearchAccountData = (searchNumber) => {
  const [example, setExample] = useState({});
  const [account, setAccount] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false)
  const [isData, setIsData] = useState(false)

  const fetchData = async () => {
    if (searchNumber.length >= 4) {
      try {
        setIsLoading(true);
        setIsError(false);

        const accountData = await AccountService.findByNumber(searchNumber);
        setAccount(accountData.data);

        const accountExampledata = await HelpExampleService.findByAccount(accountData.data.id)
        setExample(accountExampledata.data);

        setIsLoading(false);
        setIsData(true);
      }

      catch {
        setIsLoading(false);
        setIsError(true);
        setIsData(false);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchNumber])

  return {
    isLoading,
    isError,
    example,
    account,
    isData,
  }
}

export default useSearchAccountData;
