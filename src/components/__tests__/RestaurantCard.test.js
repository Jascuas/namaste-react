import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import MOCK_DATA from "../mocks/resCardMock.json";
import RestaurantCard from "../RestaurantCard";

describe("Restaurant Card Page Test Case", () => {
  test("Should load RestaurantCard component with props", () => {
    render(<RestaurantCard resData={MOCK_DATA} />);

    const name = screen.getByText("Leon's - Burgers & Wings (Leon Grill)");

    expect(name).toBeInTheDocument();
  });
});
