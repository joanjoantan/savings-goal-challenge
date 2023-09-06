import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useState, useEffect } from "react";
import Table from "./Table";

import { Transaction } from "../../types";

type Props = {
  transactions: Transaction[];
  roundedAmount: string;
  currentTabValue: string;
  setInputCallback: (input: React.SetStateAction<string>) => void;
};

const Tabs = ({
  transactions,
  roundedAmount,
  currentTabValue,
  setInputCallback,
}: Props) => {
  const [tabValue, setTabValue] = useState("1");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setTabValue(currentTabValue);
  }, [currentTabValue]);

  const handleTabValueChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setTabValue(newValue);
  };

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const input = event.target.value;
    setInputValue(input);
    setInputCallback(input);
  };

  return (
    <Box>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabValueChange}>
            <Tab label="Recent Transactions/Activity" value="1" />
            {roundedAmount !== "0.00" && (
              <Tab label="Savings Goals" value="2" />
            )}
          </TabList>
        </Box>
        <TabPanel value="1">
          <Table transactions={transactions} />
        </TabPanel>
        <TabPanel value="2">
          <TextField
            id="outlined-basic"
            label="Purpose to savings"
            data-testid="purpose-to-savings-input"
            placeholder="Enter the purpose for your savings"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={inputValue}
            onChange={handleInputChange}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Tabs;
