import React from "react";
import { render } from "@testing-library/react";

import Index from "../src/pages/index";

describe("Index", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Index totalItems={0} currentPage={0} totalPages={0} blueprints={[]} />
    );
    expect(baseElement).toBeTruthy();
  });
});
