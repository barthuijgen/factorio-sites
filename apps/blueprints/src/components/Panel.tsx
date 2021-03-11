import { css, SerializedStyles } from "@emotion/react";
import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

const panelStyles = css`
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: #313031;
  box-shadow: inset 3px 0 3px -3px #201815, inset 2px 0 2px -2px #201815,
    inset 1px 0 1px -1px #201815, inset 0 3px 3px -3px #8f8c8b, inset 0 2px 2px -2px #8f8c8b,
    inset 0 1px 1px -1px #8f8c8b, inset -3px 0 3px -3px #201815, inset -2px 0 2px -2px #201815,
    inset -2px 0 1px -1px #201815, inset 0 -3px 3px -3px #000, inset 0 -2px 2px -2px #000,
    inset 0 -1px 1px -1px #000, 0 0 2px 0 #201815, 0 0 4px 0 #201815;

  h2 {
    font-weight: 900;
    color: #ffe6c0;
    line-height: 1.25;
    margin: 0 0 12px 0;
    font-size: 120%;
    display: flex;
    align-items: center;
  }
`;
const panelInsetStyles = css`
  padding: 4px;
  box-shadow: inset 0 0 3px 0 #000, 0 -2px 2px -1px #000, -2px 0 2px -2px #28221f,
    -2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f, 0 3px 3px -3px #8f8c8b,
    0 2px 2px -2px #8f8c8b, 0 1px 1px -1px #8f8c8b;
  background-color: #242324;
  margin-top: 12px;
`;
const boxShadow = `inset 0 0 3px 0 #000, 0 -2px 2px -1px #000, -2px 0 2px -2px #28221f,
-2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f,
0 3px 3px -3px #8f8c8b, 0 2px 2px -2px #8f8c8b, 0 1px 1px -1px #8f8c8b`;

export const Panel: React.FC<
  Omit<BoxProps, "title" | "bottom"> & {
    title?: ReactNode;
    css?: SerializedStyles;
    bottom?: ReactNode;
  }
> = ({ children, title, bottom, css: prop_css, ...props }) => (
  <Box css={prop_css ? [panelStyles, prop_css] : [panelStyles]} {...props}>
    {title && <h2>{title}</h2>}
    <Box color="white" height="100%" padding="12px" bg="#414040" boxShadow={boxShadow}>
      {children}
    </Box>
    {bottom && <Box css={panelInsetStyles}>{bottom}</Box>}
  </Box>
);
