import React from "react";
import { NextPage, NextPageContext } from "next";
import { BlueprintPage, getMostRecentBlueprintPages, init } from "@factorio-sites/database";
import { SimpleGrid, Box, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import { Panel } from "../components/Panel";
import { Pagination } from "../components/Pagination";
import { useRouterQueryToHref } from "../hooks/query.hook";
import { useRouter } from "next/router";
import { BlueprintLink } from "../components/BlueprintLink";

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
  const router = useRouter();
  const routerQueryToHref = useRouterQueryToHref();
  return (
    <SimpleGrid columns={1} margin="0.7rem">
      <Panel title="Blueprints">
        <Box
          css={{
            display: "flex",
            borderBottom: "1px solid #b7b7b7",
            paddingBottom: "0.3rem",
          }}
        >
          <Box css={{ marginRight: "1rem" }}>Sort order</Box>
          <Box>
            <RadioGroup
              onChange={(value: string) => router.push(routerQueryToHref({ order: value }))}
              value={(router.query.order as string) || "date"}
            >
              <Stack direction="row">
                <Radio value="date">Last updated</Radio>
                <Radio value="favorites">Favorites</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </Box>
        <Box>
          {blueprints.map((bp) => (
            <BlueprintLink key={bp.id} blueprint={bp} />
          ))}
          <Pagination page={currentPage} totalPages={totalPages} totalItems={totalItems} />
        </Box>
      </Panel>
    </SimpleGrid>
  );
};

export async function getServerSideProps({ query }: NextPageContext) {
  await init();
  const page = Number(query.page || "1");
  const perPage = Number(query["per-page"] || "10");
  const order = (query["order"] as string) || "date";
  const { count, rows } = await getMostRecentBlueprintPages({
    page,
    perPage,
    query: query.q as string,
    order,
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
