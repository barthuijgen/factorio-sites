import React from "react";
import { useRouter } from "next/router";
import { Box, BoxProps } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import { FaEllipsisH, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import styled from "@emotion/styled";

interface PaginationProps {
  page: number;
  totalPages?: number;
  totalItems?: number;
}

export const Pagination: React.FC<BoxProps & PaginationProps> = ({
  page,
  totalPages = 0,
  totalItems = 0,
}) => {
  const router = useRouter();

  const handlePageChange = ({ selected }: { selected: number }) => {
    const query: Record<string, string> = { ...router.query, page: String(selected + 1) };
    const href = `/?${Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join("&")}`;
    router.push(href);
  };

  return (
    <StyledPagination>
      {totalPages > 1 && (
        <ReactPaginate
          initialPage={page - 1}
          pageRangeDisplayed={4}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          onPageChange={handlePageChange}
          previousLabel={<FaAngleDoubleLeft />}
          nextLabel={<FaAngleDoubleRight />}
          breakLabel={<FaEllipsisH />}
        />
      )}

      {totalItems ? <Box>{totalItems} total items</Box> : null}
    </StyledPagination>
  );
};

const StyledPagination = styled(Box)`
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;

    li {
      a {
        display: inline-flex;
        justify-content: center;
        text-align: center;
        padding: 10px 12px;
        font-size: 16px;
        font-weight: 600;
        line-height: 100%;
        height: 36px;
        width: 36px;
        outline: none;
        margin: 0 8px 8px 0;
        cursor: pointer;
        outline: none;
      }

      &:not(.break) a {
        color: #000;
        box-shadow: inset 8px 0 4px -8px #000, inset -8px 0 4px -8px #000,
          inset 0 10px 2px -8px #e3e3e3, inset 0 10px 2px -8px #282828, inset 0 -9px 2px -8px #000,
          0 0 4px 0 #000;
        background-color: #8e8e8e;

        &:hover,
        &:focus {
          color: #000;
          text-decoration: none;
          outline: 0;
          box-shadow: inset 8px 0 4px -8px #000, inset -8px 0 4px -8px #000,
            inset 0 9px 2px -8px #fff, inset 0 8px 4px -8px #000, inset 0 -8px 4px -8px #000,
            inset 0 -9px 2px -8px #432400, 0 0 4px 0 #000, inset 0 0 4px 2px #f9b44b;
          background-color: #e39827;
          filter: drop-shadow(0 0 2px #f9b44b);
        }
      }

      &.selected a {
        position: relative;
        padding-top: 12px;
        padding-bottom: 8px;
        box-shadow: inset 0 10px 2px -8px #000, inset 0 9px 2px -8px #000,
          inset 8px 0 4px -8px #563a10, inset 8px 0 4px -8px #563a10, inset -8px 0 4px -8px #563a10,
          inset -8px 0 4px -8px #563a10, inset 0 9px 2px -8px #563a10, inset 0 -9px 2px -8px #563a10,
          inset 0 -8.5px 0 -8px #563a10, 0 0 4px 0 #000;
        background-color: #f1be64;
        filter: none;
        outline: 0;
      }

      &.disabled a,
      &.disabled a:hover {
        cursor: default;
        filter: none;
        background-color: #3d3d3d;
        color: #818181;
        box-shadow: inset 8px 0 4px -8px #000, inset -8px 0 4px -8px #000, inset 0 8px 4px -8px #000,
          inset 0 -6px 4px -8px #818181, inset 0 -8px 4px -8px #000, 0 0 4px 0 #000;
      }
    }
  }
`;
