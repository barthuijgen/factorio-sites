import styled from "@emotion/styled";
import React from "react";
import { IoIosInformationCircle } from "react-icons/io";

const StyledTooltip = styled.span`
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;

  &:active:after {
    content: attr(title);
    padding: 5px;
    border: 1px solid #ccc;
    top: 5px;
    right: 10%;
    background: #bada55;
  }
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
