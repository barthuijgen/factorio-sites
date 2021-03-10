import React, { useEffect, useState } from "react";
import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { searchBlueprintPages, init } from "@factorio-sites/database";
import { BlueprintPage } from "@factorio-sites/types";
import { Panel } from "../components/Panel";
import { Pagination } from "../components/Pagination";
import { useRouterQueryToHref } from "../hooks/query.hook";
import { BlueprintLink } from "../components/BlueprintLink";
import { Select } from "../components/Select";
import { queryValueAsArray } from "../utils/query.utils";
import { useFbeData } from "../hooks/fbe.hook";
import {
  Box,
  Heading,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";

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
  const [searchQuery, setSearchQuery] = useState("");
  const routerQueryToHref = useRouterQueryToHref();
  const data = useFbeData();

  useEffect(() => {
    setSearchQuery((router.query.q as string) || "");
  }, [router.query.q]);

  if (!data) return null;

  const entityOptions = Object.keys(data.entities).filter(
    (key) => !key.startsWith("factorio-logo") && !key.startsWith("crash-site")
  );
  const recipeOptions = Object.keys(data.recipes);
  const itemOptions = Object.keys(data.items).filter((key) => key.includes("module"));

  return (
    <SimpleGrid columns={1} margin="0.7rem">
      <Panel title="Blueprints">
        <Box
          css={{
            display: "flex",
          }}
        >
          <Box
            css={{
              borderRight: "1px solid #b7b7b7",
              paddingRight: "1rem",
              marginRight: "1rem",
              width: "250px",
            }}
          >
            <Box>
              <InputGroup>
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
            <Box css={{ marginTop: "1rem" }}>
              <Text css={{ marginRight: "1rem" }}>Sort order</Text>
              <Box css={{ marginRight: "1rem" }}>
                <RadioGroup
                  onChange={(value: string) => router.push(routerQueryToHref({ order: value }))}
                  value={(router.query.order as string) || "date"}
                >
                  <Stack>
                    <Radio value="date">Last updated</Radio>
                    <Radio value="favorites">Favorites</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </Box>
            <Box css={{ marginTop: "1rem" }}>
              <Text css={{ marginRight: "1rem" }}>Entities</Text>
              <Select
                options={entityOptions}
                value={queryValueAsArray(router.query.entities)}
                onChange={(entities) => router.push(routerQueryToHref({ entities }))}
                css={{ width: "200px", marginRight: "1rem" }}
              />
            </Box>
            <Box css={{ marginTop: "1rem" }}>
              <Text css={{ marginRight: "1rem" }}>Recipes</Text>
              <Select
                options={recipeOptions}
                value={queryValueAsArray(router.query.recipes)}
                onChange={(recipes) => router.push(routerQueryToHref({ recipes }))}
                css={{ width: "200px", marginRight: "1rem" }}
              />
            </Box>
            <Box css={{ marginTop: "1rem" }}>
              <Text css={{ marginRight: "1rem" }}>Items</Text>
              <Select
                options={itemOptions}
                value={queryValueAsArray(router.query.items)}
                onChange={(items) => router.push(routerQueryToHref({ items }))}
                css={{ width: "200px", marginRight: "1rem" }}
              />
            </Box>
          </Box>
          <Box>
            <Box css={{ display: "flex", flexWrap: "wrap", minHeight: "400px" }}>
              {blueprints.map((bp) => (
                <BlueprintLink key={bp.id} blueprint={bp} type="tile" />
              ))}
            </Box>
            <Box css={{ marginTop: "15px" }}>
              <Pagination page={currentPage} totalPages={totalPages} totalItems={totalItems} />
            </Box>
          </Box>
        </Box>
      </Panel>
    </SimpleGrid>
  );
};

export async function getServerSideProps({ query }: NextPageContext) {
  await init();
  const page = Number(query.page || "1");
  const perPage = Number(query["per-page"] || "20");
  const order = (query["order"] as string) || "date";
  const tags = query.tags ? String(query.tags).split(",") : undefined;
  const entities = query.entities ? String(query.entities).split(",") : undefined;
  const items = query.items ? String(query.items).split(",") : undefined;
  const recipes = query.recipes ? String(query.recipes).split(",") : undefined;
  const user = query.user ? String(query.user) : undefined;

  const { count, rows } = await searchBlueprintPages({
    page,
    perPage,
    query: query.q as string,
    order,
    tags,
    entities,
    items,
    recipes,
    user,
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
