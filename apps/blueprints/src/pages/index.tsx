import React from "react";
import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { css } from "@emotion/react";
import { BlueprintPage, getMostRecentBlueprintPages, init } from "@factorio-sites/database";
import { SimpleGrid } from "@chakra-ui/react";
import { Panel } from "../components/Panel";
import { Pagination } from "../components/Pagination";

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

const BlueprintComponent: React.FC<{ blueprint: BlueprintPage }> = ({ blueprint }) => (
  <div css={linkStyles}>
    <Link href={`/blueprint/${blueprint.id}`} passHref>
      <a>{blueprint.title}</a>
    </Link>
  </div>
);

interface IndexProps {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  blueprints: BlueprintPage[];
}

export const Index: NextPage<IndexProps> = ({
  totalItems,
  currentPage,
  totalPages,
  blueprints,
}) => {
  return (
    <SimpleGrid columns={1} margin="0.7rem">
      <Panel title="Blueprints">
        {blueprints.map((bp) => (
          <BlueprintComponent key={bp.id} blueprint={bp} />
        ))}
        <Pagination page={currentPage} totalPages={totalPages} totalItems={totalItems} />
      </Panel>
    </SimpleGrid>
  );
};

export async function getServerSideProps({ query }: NextPageContext) {
  await init();
  const page = Number(query.page || "1");
  const perPage = Number(query["per-page"] || "10");
  const { count, rows } = await getMostRecentBlueprintPages({
    page,
    perPage,
    query: query.q as string,
  });

  return {
    props: {
      totalItems: count,
      currentPage: page,
      totalPages: Math.ceil(count / perPage),
      blueprints: rows,
    },
  };
}

export default Index;
