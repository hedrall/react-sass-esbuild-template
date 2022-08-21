import React from "react";
import { render, screen } from "@testing-library/react/pure";
import { Top, TopProps } from "@frontend/components/pages/Top/index";
import { RecoilRoot } from "recoil";

describe("Top", () => {
  let container: HTMLElement;
  const props: TopProps = {};

  beforeAll(() => {
    const tree = render(
      <RecoilRoot>
        <Top {...props} />
      </RecoilRoot>
    );
    container = tree.container;
  });

  test("snapshot", () => {
    // To wrap with
    // expect(container).toMatchSnapshot();
  });
});
