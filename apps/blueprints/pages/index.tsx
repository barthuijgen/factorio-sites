/** @jsx jsx */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { jsx, css } from "@emotion/core";
import { BlueprintPageEntry, getMostRecentBlueprintPages } from "@factorio-sites/database";
import { Panel } from "../src/Panel";
import { SimpleGrid } from "@chakra-ui/core";
import { Pagination } from "../src/Pagination";

const linkStyles = css`
  width: 100%;
  margin: 5px 0;
  a {
    display: block;
    padding: 5px;
    color: #fff;
  }
  &:hover {
    cursor: pointer;
    background: #ccc;
  }
`;

const BlueprintComponent: React.FC<{ blueprint: BlueprintPageEntry }> = ({ blueprint }) => (
  <div css={linkStyles}>
    <Link href={`/blueprint/${blueprint.id}`} passHref>
      <a>{blueprint.title}</a>
    </Link>
  </div>
);

interface IndexProps {
  page: number;
  blueprints: BlueprintPageEntry[];
}

export const Index: NextPage<IndexProps> = ({ page, blueprints }) => {
  return (
    <SimpleGrid columns={1} margin="0.7rem">
      <Panel title="Blueprints" w="100%">
        {blueprints.map((bp) => (
          <BlueprintComponent key={bp.id} blueprint={bp} />
        ))}
        <Pagination page={page} />
      </Panel>
    </SimpleGrid>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const page = Number(context.query.page || "1");
  const blueprints = await getMostRecentBlueprintPages(page);

  return {
    props: {
      page,
      blueprints,
    },
  };
}

export default Index;
