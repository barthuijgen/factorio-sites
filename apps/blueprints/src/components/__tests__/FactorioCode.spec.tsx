/* eslint-disable no-irregular-whitespace */
import React from "react";
import { render } from "@testing-library/react";
import { FactorioCode } from "../FactorioCode";
import { createSerializer } from "@emotion/jest";

expect.addSnapshotSerializer(createSerializer({ DOMElements: false }));

const cleanUpElement = (element: Element) => {
  const el = element.querySelector("div > div");
  if (!el) return null;
  el.className = "";
  return el;
};

describe("FactorioCode", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FactorioCode code="My awesome blueprint" />);

    expect(cleanUpElement(baseElement)).toMatchInlineSnapshot(`
      <div
        class=""
      >
        My awesome blueprint
      </div>
    `);
  });

  it("should render with color", () => {
    const { baseElement } = render(<FactorioCode code="Blueprint [color=red]red[/color]" />);

    expect(cleanUpElement(baseElement)).toMatchInlineSnapshot(`
      .emotion-0 {
        color: red;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      <div
        class=""
      >
        <span>
          Blueprint 
        </span>
        <span
          class="emotion-0"
        >
          red
        </span>
      </div>
    `);
  });

  it("should render with icons", () => {
    const { baseElement } = render(<FactorioCode code="Blueprint [item=iron-ore]" />);

    expect(cleanUpElement(baseElement)).toMatchInlineSnapshot(`
      .emotion-0 {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url('https://storage.googleapis.com/factorio-blueprints-assets/factorio/graphics/icons/iron-ore.png');
        -webkit-background-size: 38px;
        background-size: 38px;
      }

      <div
        class=""
      >
        <span>
          Blueprint 
        </span>
        <div
          class="emotion-0"
        />
      </div>
    `);
  });

  it("should render icons in colors", () => {
    const { baseElement } = render(
      <FactorioCode code="Blueprint [color=white]hello [item=iron-ore][/color]" />
    );

    expect(cleanUpElement(baseElement)).toMatchInlineSnapshot(`
      .emotion-0 {
        color: white;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .emotion-1 {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url('https://storage.googleapis.com/factorio-blueprints-assets/factorio/graphics/icons/iron-ore.png');
        -webkit-background-size: 38px;
        background-size: 38px;
      }

      <div
        class=""
      >
        <span>
          Blueprint 
        </span>
        <span
          class="emotion-0"
        >
          <span>
            hello 
          </span>
          <div
            class="emotion-1"
          />
        </span>
      </div>
    `);
  });
});
