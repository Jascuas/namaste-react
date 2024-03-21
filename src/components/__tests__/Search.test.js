import "@testing-library/jest-dom";

import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import Body from "../Body";
import MOCK_DATA from "../mocks/mockResListData.json";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

describe("Search Component Test Case", () => {
  it("Should Search Res List for burger text input", async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      )
    );
    const cardsBeforeSearch = screen.getAllByTestId("resCard");

    expect(cardsBeforeSearch.length).toBe(20);

    const searchBtn = screen.getByRole("button", { name: "Search" });

    const searchInput = screen.getByTestId("searchInput");

    fireEvent.change(searchInput, { target: { value: "burger" } });

    fireEvent.click(searchBtn);

    const cardsAfterSearch = screen.getAllByTestId("resCard");

    expect(cardsAfterSearch.length).toBe(4);
  });
  it("Should filter Top Rated Restaurants", async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      )
    );
    const cardsBeforeFilter = screen.getAllByTestId("resCard");

    expect(cardsBeforeFilter.length).toBe(20);

    const filterBtn = screen.getByRole("button", {
      name: "Top Rated Restaurants",
    });

    fireEvent.click(filterBtn);

    const cardsAfterSearch = screen.getAllByTestId("resCard");

    expect(cardsAfterSearch.length).toBe(13);
  });
});
