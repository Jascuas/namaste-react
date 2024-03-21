import "@testing-library/jest-dom";

import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import appStore from "../../utils/appStore";
import Cart from "../Cart";
import Header from "../Header";
import MOCK_DATA_NAME from "../mocks/mockResMenu.json";
import RestaurantMenu from "../RestaurantMenu";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA_NAME);
    },
  });
});

describe("Restaurant Menu Page Test Case", () => {
  test("Should load Resaurant Menu Component and add 1 item to the cart", async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Provider store={appStore}>
            <Header />
            <RestaurantMenu />
            <Cart />
          </Provider>
        </BrowserRouter>
      )
    );

    const accordionHeader = screen.getByText("Bucket Biryani (3)");

    fireEvent.click(accordionHeader);

    const accordionItems = screen.getAllByTestId("foodItems");
    expect(accordionItems.length).toBe(3);

    const addBtns = screen.getAllByRole("button", { name: "Add +" });

    fireEvent.click(addBtns[0]);

    const cart = screen.getByText("Cart - (1 items)");
    expect(cart).toBeInTheDocument();

    fireEvent.click(addBtns[0]);
    const cart2 = screen.getByText("Cart - (2 items)");
    expect(cart2).toBeInTheDocument();

    const foodItems = screen.getAllByTestId("foodItems");
    expect(foodItems.length).toBe(5);
  });
});
