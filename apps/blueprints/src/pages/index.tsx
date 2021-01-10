import React from "react";
import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { css } from "@emotion/react";
import { BlueprintPage, getMostRecentBlueprintPages } from "@factorio-sites/database";
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
  page: number;
  blueprints: BlueprintPage[];
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
