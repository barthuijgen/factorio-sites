import React, { useState } from "react";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../providers/auth";
import { Button } from "./Button";

const MenuItem: React.FC<{ href: string }> = ({ children, href }) => (
  <Link href={href} passHref>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a>
      <Text mt={{ base: 4, md: 0 }} display="block">
        {children}
      </Text>
    </a>
  </Link>
);

const Buttons: React.FC = () => {
  const auth = useAuth();
  const router = useRouter();

  if (auth) {
    return (
      <>
        <Link href="/user/blueprint-create" passHref>
          <a>
            <Button primary>Upload</Button>
          </a>
        </Link>
        <MenuItem href="/user/favorites">My Favorites</MenuItem>
        <MenuItem href="/user/blueprints">My blueprints</MenuItem>
        <MenuItem href="/user/edit">Account</MenuItem>
        <MenuItem href="/about">About</MenuItem>
        <MenuItem href={`/api/logout?redirect=${router.asPath}`}>Logout</MenuItem>
      </>
    );
  }
  return (
    <>
      <Link href="/login" passHref>
        <a>
          <Button primary>Upload</Button>
        </a>
      </Link>

      <MenuItem href="/register">Register</MenuItem>
      <MenuItem href="/login">Login</MenuItem>
      <MenuItem href="/about">About</MenuItem>
    </>
  );
};

export const Header: React.FC = (props) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="header"
      align="center"
      alignItems="center"
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
      <Box
        as="nav"
        display={{
          base: show ? "block" : "none",
          md: "flex",
        }}
        alignItems="center"
        css={{
          gap: "16px",
        }}
        width={{ base: "full", md: "auto" }}
      >
        <Buttons />
      </Box>
    </Flex>
  );
};
