import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { mockTransactions } from "../../mockData/index";
import Table from "./Table";

test("renders table with tranasction lists", async () => {
  render(<Table transactions={mockTransactions.feedItems} />);

  const firstTablehead = screen.getByText("Date");
  expect(firstTablehead).toBeInTheDocument();

  const secondTablehead = screen.getByText("Reference");
  expect(secondTablehead).toBeInTheDocument();

  const thirdTablehead = screen.getByText("Amount");
  expect(thirdTablehead).toBeInTheDocument();

  const reference = screen.getByText("WAITROSE LIMITED");
  expect(reference).toBeInTheDocument();

  const amount = screen.getByText("£1.00");
  expect(amount).toBeInTheDocument();
});

test("renders table with tranasction is empty", async () => {
  render(<Table transactions={[]} />);

  const firstTablehead = screen.getByText("No entries found");
  expect(firstTablehead).toBeInTheDocument();
});
