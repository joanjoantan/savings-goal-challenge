import "./App.css";

import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Tabs from "./components/Elements/Tabs";

import { converMinorUnits, currencySmybols } from "./common/helpers";

import useAPICall from "./api/index";

const App = () => {
  const [flag, setFlag] = useState(true);
  const [savingsGoalsFlag, seSavingsGoalstFlag] = useState(true);
  const [loading, setLoading] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState({ accountUid: "" });
  const [roundedAmount, setRoundedAmount] = useState<string>("0.00");
  const [calendarStart, setCalendarStart] = useState(
    moment().subtract(6, "days").format("YYYY-MM-DD")
  );
  const [calendarEnd, setCalendarEnd] = useState(moment().format("YYYY-MM-DD"));

  const [tabValue, setTabValue] = React.useState("1");
  const [inputValue, setInputValue] = useState("");

  const {
    accountList,
    fetchAccounts,
    transactions,
    fetchTransactions,
    savingsGoals,
    fetchSavingsGoals,
    roundedAmountTransfer,
    failedMessage,
  } = useAPICall();

  useEffect(() => {
    if (flag) {
      fetchAccounts();
      setFlag(false);
    }
  }, [fetchAccounts, flag]);

  useEffect(() => {
    if (selectedAccount.accountUid !== "" && savingsGoalsFlag) {
      fetchSavingsGoals(selectedAccount.accountUid);
      seSavingsGoalstFlag(false);
    }
  }, [selectedAccount, fetchSavingsGoals, savingsGoalsFlag]);

  const handleGetTransactions = (account: any) => {
    setSelectedAccount(account);

    const params = {
      minTransactionTimestamp: moment(calendarStart).toISOString(),
      maxTransactionTimestamp: moment(calendarEnd).add(1, "days").toISOString(),
    };

    fetchTransactions(
      account.accountUid,
      account.defaultCategory,
      params,
      setLoading
    );
  };

  const handleRound = () => {
    const roundedTotalAmount = transactions
      .map(
        (tran) =>
          Math.ceil(converMinorUnits(tran.amount.minorUnits)) -
          converMinorUnits(tran.amount.minorUnits)
      )
      .reduce((acc, num) => acc + num, 0);

    const roundedAmountString = (
      Math.round(roundedTotalAmount * 100) / 100
    ).toFixed(2);

    setRoundedAmount(roundedAmountString);
    setTabValue("2");
  };

  const handleRoundedAmountTransfer = () => {
    const minorUnits: number = Number(roundedAmount);

    roundedAmountTransfer(selectedAccount.accountUid, inputValue, minorUnits);
  };

  return (
    <Box className="App">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div>
            <h1>Savings Goal Challenge</h1>
            <p>
              <b>Select dates: </b>
              <input
                type="date"
                id="start"
                name="transaction-start"
                onChange={(e) => setCalendarStart(e.target.value)}
                value={calendarStart}
              />{" "}
              <input
                type="date"
                id="end"
                name="transaction-end"
                min={calendarStart}
                onChange={(e) => setCalendarEnd(e.target.value)}
                value={calendarEnd}
              />
            </p>

            <p />
            {accountList.length
              ? accountList.map((account, index) => {
                  return (
                    <Button
                      key={index}
                      variant="contained"
                      onClick={() => handleGetTransactions(account)}
                      style={{ textTransform: "initial" }}
                    >
                      Step 1: Get transactions
                    </Button>
                  );
                })
              : "There are no accounts available"}

            <p />
            {transactions.length ? (
              <>
                <Button
                  variant="contained"
                  onClick={() => handleRound()}
                  style={{ textTransform: "initial" }}
                >
                  Step 2: Generate the round up amount
                </Button>

                <span>
                  <b> Round amount: </b>
                  {roundedAmount ? `${currencySmybols}${roundedAmount}` : ""}
                </span>
              </>
            ) : (
              ""
            )}

            {loading && <p>Loading...</p>}

            {transactions.length ? (
              <Tabs
                transactions={transactions}
                roundedAmount={roundedAmount}
                currentTabValue={tabValue}
                setInputCallback={setInputValue}
              />
            ) : (
              ""
            )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <h1>Savings Goal Lists</h1>

          <Button
            variant="contained"
            data-testid="purpose-to-savings-button"
            disabled={inputValue.length > 0 ? false : true}
            onClick={() => handleRoundedAmountTransfer()}
            style={{ textTransform: "initial", marginTop: "10px" }}
          >
            {inputValue.length > 0
              ? `Step 3: Transfer ${currencySmybols}${roundedAmount} to Savings Goals`
              : "Enter the purpose for your savings"}
          </Button>

          {failedMessage.length > 0 && (
            <Box sx={{ width: 500 }}>
              <p>
                <Alert severity="error">
                  This is an error alert — check it out!
                </Alert>
              </p>
            </Box>
          )}

          <ul>
            {savingsGoals &&
              savingsGoals.map(
                (goal: {
                  savingsGoalUid: string;
                  name: string;
                  target: { minorUnits: number };
                }) => {
                  return (
                    <li key={goal.savingsGoalUid}>
                      <label htmlFor={goal.savingsGoalUid}>
                        {goal.name} - saved: {currencySmybols}
                        {goal && goal.target && goal.target.minorUnits / 100}
                      </label>
                    </li>
                  );
                }
              )}
          </ul>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
