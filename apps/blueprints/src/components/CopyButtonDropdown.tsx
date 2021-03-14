import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Button } from "../components/Button";
import { CopyButton } from "../components/CopyButton";
import { Box } from "@chakra-ui/layout";
import styled from "@emotion/styled";

const Wrapper = styled(Box)`
  position: relative;
`;

const DropdownBox = styled(Box)`
  position: absolute;
  transform: translateY(100%);
  bottom: -0.5rem;
  right: 40px;
  z-index: 3;
`;

export const CopyButtonDropdown: React.FC = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log({ dropdownOpen });
  return (
    <Wrapper {...props}>
      <CopyButton content="test" label="Copy blueprint" />
      {dropdownOpen && (
        <DropdownBox>
          <CopyButton content="test" label="Copy URL" />
        </DropdownBox>
      )}
      <Button onClick={() => setDropdownOpen(!dropdownOpen)}>
        <AiFillCaretDown />
      </Button>
    </Wrapper>
  );
};
