import React from "react";
import { render, screen } from "@testing-library/react/pure";
import { Error, ErrorProps } from "@frontend/components/pages/Error/index";

describe("Error", () => {
  let container: HTMLElement;

  const props: ErrorProps = {};

  beforeAll(() => {
    const tree = render(<Error {...props} />);
    container = tree.container;
  });

  test("snapshot", () => {
    expect(container).toMatchSnapshot();
  });
});
