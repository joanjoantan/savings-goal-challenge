import axios from "axios";
import { useState } from "react";
import { BANKAPI } from "../config/index";
import { clientHeader } from "../common/client";
import { Transaction, SavingsGoal } from "../types/index";

const ACCOUNTS = "api/v2/accounts";

const useAPICall = () => {
  const [accountList, setAccountList] = useState([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [successMessage, setSuccessMessage] = useState<Boolean>(false);
  const [failedMessage, setFailedMessage] = useState<string>("");

  const fetchAccounts = () => {
    axios
      .get(`${BANKAPI.BASE_URL}${ACCOUNTS}`, { headers: clientHeader })
      .then((details) => {
        setAccountList(details.data.accounts);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.data.errors) {
          setFailedMessage(error.response.data.errors);
        }
      });
  };

  const fetchTransactions = (
    accountUid: string,
    defaultCategory: string,
    params: { minTransactionTimestamp: any; maxTransactionTimestamp: any },
    setLoading: (arg0: boolean) => void
  ) => {
    setLoading(true);
    axios
      .get(
        BANKAPI.BASE_URL +
          `api/v2/feed/account/${accountUid}/category/${defaultCategory}/transactions-between`,
        { headers: clientHeader, params }
      )
      .then((transactions) => {
        setTransactions(transactions.data.feedItems);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.data.errors) {
          setFailedMessage(error.response.data.errors);
        }
      });
  };

  const fetchSavingsGoals = (accountUid: string) => {
    axios
      .get(BANKAPI.BASE_URL + `api/v2/account/${accountUid}/savings-goals`, {
        headers: clientHeader,
      })
      .then((savingsGoals) =>
        setSavingsGoals(savingsGoals.data.savingsGoalList)
      )
      .catch(function (error) {
        console.log(error);
        if (error.response.data.errors) {
          setFailedMessage(error.response.data.errors);
        }
      });
  };

  const roundedAmountTransfer = (
    accountUid: string,
    inputValue: string,
    minorUnits: number
  ) => {
    axios
      .put(
        BANKAPI.BASE_URL + `api/v2/account/${accountUid}/savings-goals`,
        {
          name: inputValue,
          currency: "GBP",
          target: {
            currency: "GBP",
            minorUnits: minorUnits * 100,
          },
        },
        { headers: clientHeader }
      )
      .then(function (response) {
        if (response.data.success) {
          setSuccessMessage(response.data.success);
          fetchSavingsGoals(accountUid);
        }
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          setFailedMessage(error.response.data.errors);
        }
      });
  };

  return {
    accountList,
    fetchAccounts,
    transactions,
    fetchTransactions,
    savingsGoals,
    fetchSavingsGoals,
    roundedAmountTransfer,
    successMessage,
    failedMessage,
  };
};

export default useAPICall;
