import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, BoxProps, Button } from "@chakra-ui/react";

interface PaginationProps {
  page: number;
  totalPages?: number;
  totalItems?: number;
}

const PaginationLink: React.FC<PaginationProps> = ({ page }) => {
  const router = useRouter();
  const query: Record<string, string> = { ...router.query, page: page.toString() };
  const href =
    "/?" +
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

export const Pagination: React.FC<BoxProps & PaginationProps> = ({
  page,
  totalPages,
  totalItems,
}) => (
  <Box>
    {page > 1 && <PaginationLink page={page - 1} />}
    {!totalPages || (page + 1 < totalPages && <PaginationLink page={page + 1} />)}
    {totalItems ? <Box css={{ marginTop: "1rem" }}>{totalItems} total items</Box> : null}
  </Box>
);
