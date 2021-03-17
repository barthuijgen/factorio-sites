import React, { ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import clsx from "clsx";

const StyledPanel = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: #313031;
  box-shadow: inset 3px 0 3px -3px #201815, inset 2px 0 2px -2px #201815,
    inset 1px 0 1px -1px #201815, inset 0 3px 3px -3px #8f8c8b, inset 0 2px 2px -2px #8f8c8b,
    inset 0 1px 1px -1px #8f8c8b, inset -3px 0 3px -3px #201815, inset -2px 0 2px -2px #201815,
    inset -2px 0 1px -1px #201815, inset 0 -3px 3px -3px #000, inset 0 -2px 2px -2px #000,
    inset 0 -1px 1px -1px #000, 0 0 2px 0 #201815, 0 0 4px 0 #201815;

  .title {
    font-weight: 900;
    color: #ffe6c0;
    line-height: 1.25;
    margin: 0 0 12px 0;
    font-size: 120%;
    display: flex;
    align-items: center;
  }

  .panel-content {
    color: white;
    height: 100%;
    padding: 12px;
    background: #414040;
    box-shadow: inset 0 0 3px 0 #000, 0 -2px 2px -1px #000, -2px 0 2px -2px #28221f,
      -2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f,
      0 3px 3px -3px #8f8c8b, 0 2px 2px -2px #8f8c8b, 0 1px 1px -1px #8f8c8b;
  }
`;

interface PanelProps extends Omit<BoxProps, "title" | "bottom"> {
  title?: ReactNode;
  bottom?: ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ title, bottom, children, className, ...props }) => (
  <StyledPanel className={clsx("panel", className)} {...props}>
    {title && <h2 className="title">{title}</h2>}
    <div className="panel-content">{children}</div>
    {bottom && <div className="panel-inset">{bottom}</div>}
  </StyledPanel>
);
