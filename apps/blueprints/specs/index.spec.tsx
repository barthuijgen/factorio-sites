import React from "react";
import { render } from "@testing-library/react";
import Index from "../src/pages/index";
import * as nextRouter from "next/router";

const useRouter = jest.spyOn(nextRouter, "useRouter");

describe("Index", () => {
  it("should render successfully", () => {
    useRouter.mockImplementationOnce(() => ({ query: {} } as any));

    const { baseElement } = render(
      <Index totalItems={0} currentPage={0} totalPages={0} blueprints={[]} />
    );
    expect(baseElement).toBeTruthy();
  });
});
