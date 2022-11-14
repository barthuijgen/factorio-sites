/* eslint-disable @typescript-eslint/no-explicit-any, import/first */
jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {},
}));

import { render } from "@testing-library/react";
import Index from "../src/pages/index";
import * as nextRouter from "next/router";
import { NextRouter } from "next/router";

const useRouter = jest.spyOn(nextRouter, "useRouter");
(global as any).fetch = jest.fn(() => Promise.resolve());
console.error = jest.fn();

describe("Index", () => {
  it("should render successfully", () => {
    useRouter.mockImplementation(() => ({ query: {} } as NextRouter));

    const { baseElement } = render(
      <Index totalItems={0} currentPage={0} totalPages={0} blueprints={[]} />
    );
    expect(baseElement).toBeTruthy();
  });
});
