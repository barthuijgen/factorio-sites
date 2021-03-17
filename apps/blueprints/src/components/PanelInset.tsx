import React from "react";
import styled from "@emotion/styled";
import { Box, BoxProps } from "@chakra-ui/layout";

interface PanelInsetProps extends BoxProps {
  light?: boolean;
}

const StyledPanelInset = styled(Box)`
  display: block;
  padding: 4px;
  box-shadow: inset 0 0 3px 0 #000, 0 -2px 2px -1px #000, -2px 0 2px -2px #28221f,
    -2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f, 0 3px 3px -3px #8f8c8b,
    0 2px 2px -2px #8f8c8b, 0 1px 1px -1px #8f8c8b;
  background-color: #242324;

  &.light {
    height: 100%;
    padding: 12px;
    background: #414040;
    box-shadow: inset 0 0 3px 0 #000, 0 -2px 2px -1px #000, -2px 0 2px -2px #28221f,
      -2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f,
      0 3px 3px -3px #8f8c8b, 0 2px 2px -2px #8f8c8b, 0 1px 1px -1px #8f8c8b;
  }
`;

export const PanelInset: React.FC<PanelInsetProps> = ({ className, children, ...props }) => {
  return (
    <StyledPanelInset className={className} {...props}>
      {children}
    </StyledPanelInset>
  );
};
