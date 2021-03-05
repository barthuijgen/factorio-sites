import React from "react";
import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { BlueprintPage, searchBlueprintPages, init } from "@factorio-sites/database";
import { SimpleGrid, Box, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import { Panel } from "../components/Panel";
import { Pagination } from "../components/Pagination";
import { useRouterQueryToHref } from "../hooks/query.hook";
import { useRouter } from "next/router";
import { BlueprintLink } from "../components/BlueprintLink";
import { TagsSelect } from "../components/TagsSelect";
import { queryValueAsArray } from "../utils/query.utils";

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
            alignItems: "center",
            borderBottom: "1px solid #b7b7b7",
            paddingBottom: "0.3rem",
          }}
        >
          <Box css={{ marginRight: "1rem" }}>Sort order</Box>
          <Box css={{ marginRight: "1rem" }}>
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
          <TagsSelect
            value={queryValueAsArray(router.query.tags)}
            onChange={(tags) => router.push(routerQueryToHref({ tags }))}
            css={{ width: "200px", marginRight: "1rem" }}
          />
          {router.query.q && (
            <Box>
              <span>Search term:</span>
              <span
                css={{ margin: "0 5px 0 0.5rem", border: "1px solid #ababab", padding: "0px 10px" }}
              >
                {router.query.q}
              </span>
              <Link href={routerQueryToHref({ q: null })}>x</Link>
            </Box>
          )}
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
  const tags = query.tags ? String(query.tags).split(",") : undefined;
  console.log(tags);
  const { count, rows } = await searchBlueprintPages({
    page,
    perPage,
    query: query.q as string,
    order,
    tags,
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
