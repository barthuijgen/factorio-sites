/* eslint-disable no-irregular-whitespace */
import { render } from "@testing-library/react";
import { FactorioCode } from "../FactorioCode";
import { createSerializer } from "@emotion/jest";

expect.addSnapshotSerializer(createSerializer());

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
      .emotion-1 {
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
        <p
          class="chakra-text emotion-0"
        >
          Blueprint 
        </p>
        <p
          class="chakra-text emotion-1"
        >
          red
        </p>
      </div>
    `);
  });

  it("should render with icons", () => {
    const { baseElement } = render(<FactorioCode code="Blueprint [item=iron-ore]" />);

    expect(cleanUpElement(baseElement)).toMatchInlineSnapshot(`
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
        <p
          class="chakra-text emotion-0"
        >
          Blueprint 
        </p>
        <div
          class="emotion-1"
        />
      </div>
    `);
  });

  it("should render icons in colors", () => {
    const { baseElement } = render(
      <FactorioCode code="Blueprint [color=white]hello [item=iron-ore][/color]" />
    );

    expect(cleanUpElement(baseElement)).toMatchInlineSnapshot(`
      .emotion-1 {
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

      .emotion-3 {
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
        <p
          class="chakra-text emotion-0"
        >
          Blueprint 
        </p>
        <p
          class="chakra-text emotion-1"
        >
          <p
            class="chakra-text emotion-0"
          >
            hello 
          </p>
          <div
            class="emotion-3"
          />
        </p>
      </div>
    `);
  });
});
