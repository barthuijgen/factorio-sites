import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/core";
import Link from "next/link";

// const MenuItems = ({ children }) => (
//   <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
//     {children}
//   </Text>
// );

export const Header: React.FC = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="rgba(0,0,0,.7)"
      color="#ffe6c0"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          <Link href="/">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <a>Factorio Blueprints</a>
          </Link>
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      {/* <Box
        as="nav"
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Docs</MenuItems>
        <MenuItems>Examples</MenuItems>
        <MenuItems>Blog</MenuItems>
      </Box> */}

      {/* <Box display={{ sm: show ? "block" : "none", md: "block" }} mt={{ base: 4, md: 0 }}>
        <Button bg="transparent" border="1px">
          Create account
        </Button>
      </Box> */}
    </Flex>
  );
};
