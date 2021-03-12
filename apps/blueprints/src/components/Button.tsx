import React from "react";
import styled from "@emotion/styled";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ primary, className, children, ...props }) => {
  return (
    <StyledButton className={clsx("button", { primary }, className)} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background-color: #8e8e8e;
  padding: 10px 12px;
  font-size: 100%;
  text-align: left;
  color: #000;
  font-weight: 600;
  display: inline-block;
  vertical-align: baseline;
  border: none;
  line-height: 100%;
  vertical-align: middle;
  white-space: nowrap;
  box-shadow: inset 8px 0 4px -8px #000, inset -8px 0 4px -8px #000, inset 0 10px 2px -8px #e3e3e3,
    inset 0 10px 2px -8px #282828, inset 0 -9px 2px -8px #000, 0 0 4px 0 #000;
  position: relative;
  cursor: pointer;
  user-select: none;
  height: 36px;
  outline: none;

  &.primary {
    background-color: #5eb663;
  }

  &.danger {
    background-color: #fe5a5a;
    box-shadow: inset 8px 0 4px -8px #000, inset -8px 0 4px -8px #000, inset 0 10px 2px -8px #fda1a1,
      inset 0 10px 2px -8px #8b0101, inset 0 -9px 2px -8px #000, 0 0 4px 0 #000;
  }

  &:hover {
    color: #000;
    text-decoration: none;
    outline: 0;
    box-shadow: inset 8px 0 4px -8px #000, inset -8px 0 4px -8px #000, inset 0 9px 2px -8px #fff,
      inset 0 8px 4px -8px #000, inset 0 -8px 4px -8px #000, inset 0 -9px 2px -8px #432400,
      0 0 4px 0 #000, inset 0 0 4px 2px #f9b44b;
    background-color: #e39827;
    filter: drop-shadow(0 0 2px #f9b44b);
  }

  &:active {
    position: relative;
    padding-top: 12px;
    padding-bottom: 8px;
    vertical-align: -2px;
    box-shadow: inset 0 10px 2px -8px #000, inset 0 9px 2px -8px #000, inset 8px 0 4px -8px #563a10,
      inset 8px 0 4px -8px #563a10, inset -8px 0 4px -8px #563a10, inset -8px 0 4px -8px #563a10,
      inset 0 9px 2px -8px #563a10, inset 0 -9px 2px -8px #563a10, inset 0 -8.5px 0 -8px #563a10,
      0 0 4px 0 #000;
    background-color: #f1be64;
    filter: none;
    outline: 0;
  }

  &:disabled {
    padding-top: 10px;
    padding-bottom: 10px;
    cursor: default;
    vertical-align: 0;
    background-color: #3d3d3d;
    color: #818181;
    box-shadow: inset 8px 0 4px -8px #000, inset -8px 0 4px -8px #000, inset 0 8px 4px -8px #000,
      inset 0 -6px 4px -8px #818181, inset 0 -8px 4px -8px #000, 0 0 4px 0 #000;
    filter: none;
  }
`;
