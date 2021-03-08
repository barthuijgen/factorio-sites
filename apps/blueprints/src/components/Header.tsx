import React, { useEffect, useState } from "react";
import { Box, Heading, Flex, Text, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../providers/auth";
import { MdSearch } from "react-icons/md";

const MenuItem: React.FC<{ href: string }> = ({ children, href }) => (
  <Link href={href} passHref>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a>
      <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
        {children}
      </Text>
    </a>
  </Link>
);

export const Header: React.FC = (props) => {
  const auth = useAuth();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleToggle = () => setShow(!show);

  useEffect(() => {
    setSearchQuery((router.query.q as string) || "");
  }, [router.query.q]);

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

      <Box>
        <InputGroup css={{ width: "20rem" }}>
          <InputLeftElement pointerEvents="none" children={<MdSearch />} />
          <Input
            type="text"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                router.push(`/?q=${searchQuery}`);
              }
            }}
          />
        </InputGroup>
      </Box>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        as="nav"
        display={{
          base: show ? "block" : "none",
          md: "flex",
        }}
        width={{ base: "full", md: "auto" }}
      >
        {auth ? (
          <>
            <MenuItem href="/user/blueprints">My blueprints</MenuItem>
            <MenuItem href="/user/edit">Account</MenuItem>
            <MenuItem href="/about">About</MenuItem>
            <MenuItem href={`/api/logout?redirect=${router.pathname}`}>Logout</MenuItem>
          </>
        ) : (
          <>
            <MenuItem href="/register">Register</MenuItem>
            <MenuItem href="/login">Login</MenuItem>
            <MenuItem href="/about">About</MenuItem>
          </>
        )}
      </Box>
    </Flex>
  );
};
