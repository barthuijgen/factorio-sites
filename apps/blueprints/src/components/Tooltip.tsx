import styled from "@emotion/styled";
import React from "react";
import { IoIosInformationCircle } from "react-icons/io";

const StyledTooltip = styled.span`
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
`;

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, ...props }) => {
  return (
    <StyledTooltip title={text} {...props}>
      <IoIosInformationCircle color="#89cde9" />
    </StyledTooltip>
  );
};
