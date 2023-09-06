import { render, screen } from "@testing-library/react";

import App from "./App";
import "@testing-library/jest-dom/extend-expect";

test("renders header title", async () => {
  render(<App />);

  const title = screen.getByText(/Savings Goal Challenge/i);
  expect(title).toBeInTheDocument();

  const noAccount = screen.getByText(/There are no accounts available/i);
  expect(noAccount).toBeInTheDocument();
});

test("renders date label", async () => {
  render(<App />);

  const title = screen.getByText(/Select dates:/i);
  expect(title).toBeInTheDocument();

  const noAccount = screen.getByText(/There are no accounts available/i);
  expect(noAccount).toBeInTheDocument();
});
