/* eslint-disable import/first */
jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {},
}));

import { render } from "@testing-library/react";
import Index from "../src/pages/index";
import * as nextRouter from "next/router";

const useRouter = jest.spyOn(nextRouter, "useRouter");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).fetch = jest.fn(() => Promise.resolve());
console.error = jest.fn();

describe("Index", () => {
  it("should render successfully", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useRouter.mockImplementationOnce(() => ({ query: {} } as any));

    const { baseElement } = render(
      <Index totalItems={0} currentPage={0} totalPages={0} blueprints={[]} />
    );
    expect(baseElement).toBeTruthy();
  });
});
