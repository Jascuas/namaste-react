import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

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
  test("Should render the Body Component with Search", () => {
    render(<Body />);

    const name = screen.getByText("Leon's - Burgers & Wings (Leon Grill)");

    expect(name).toBeInTheDocument();
  });
});
