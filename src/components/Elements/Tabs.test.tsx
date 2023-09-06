import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mockTransactions } from "../../mockData/index";
import Tabs from "./Tabs";
import "@testing-library/jest-dom/extend-expect";

const callback = jest.fn();

test("render email input", async () => {
  render(
    <Tabs
      transactions={mockTransactions.feedItems}
      roundedAmount={"22.03"}
      currentTabValue={"2"}
      setInputCallback={callback}
    />
  );

  const firstTabhead = screen.getByText("Recent Transactions/Activity");
  expect(firstTabhead).toBeInTheDocument();

  const secondTabhead = screen.getByText("Savings Goals");
  expect(secondTabhead).toBeInTheDocument();

  const inputEl = screen.getByTestId("purpose-to-savings-input");
  expect(inputEl).toBeInTheDocument();
});
