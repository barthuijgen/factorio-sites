/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, BoxProps, Button } from "@chakra-ui/core";

interface PaginationProps {
  page: number;
}

const PaginationLink: React.FC<PaginationProps> = ({ page }) => {
  const router = useRouter();
  const query: Record<string, string> = { ...router.query, page: page.toString() };
  const href =
    "?" +
    Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join("&");

  return (
    <Link href={href} passHref>
      <Button as="a" size="sm" color="black" css={{ marginRight: "1rem" }}>
        {page}
      </Button>
    </Link>
  );
};

export const Pagination: React.FC<BoxProps & PaginationProps> = ({ page, ...props }) => (
  <Box {...props}>
    {page > 1 && <PaginationLink page={page - 1} />}
    <PaginationLink page={page + 1} />
  </Box>
);
