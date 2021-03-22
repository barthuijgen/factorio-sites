import React, { useEffect, useState } from "react";
import { NextPage, NextPageContext } from "next";
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
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  RadioGroup,
  Stack,
  Radio,
  Checkbox,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { MdSearch } from "react-icons/md";
import { TAGS } from "@factorio-sites/common-utils";
import { mq } from "@factorio-sites/web-utils";

const pageCss = css({
  display: "flex",
  flexDirection: "column",
  [mq[0]]: {
    flexDirection: "row",
  },
});
const sidebarCss = css({
  borderBottom: "1px solid #b7b7b7",
  paddingBottom: "1rem",
  marginBottom: "1rem",
  [mq[0]]: {
    borderRight: "1px solid #b7b7b7",
    marginRight: "1rem",
    paddingRight: "1rem",
    borderBottom: "none",
    paddingBottom: "0",
    marginBottom: "0",
    width: "233px",
  },
});
const SidebarRow = css({
  marginTop: "1rem",
});
const sidebarCheckbox = css(SidebarRow, {
  display: "flex",
  alignItems: "center",
  p: {
    marginRight: "1rem",
    display: "inline-block",
  },
});

interface IndexProps {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  blueprints: Pick<
    BlueprintPage,
    "id" | "image_hash" | "favorite_count" | "title" | "updated_at"
  >[];
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
  }, [router?.query.q]);

  if (!data) return null;

  const entityOptions = Object.keys(data.entities).filter(
    (key) => !key.startsWith("factorio-logo") && !key.startsWith("crash-site")
  );
  const recipeOptions = Object.keys(data.recipes);
  const itemOptions = Object.keys(data.items).filter((key) => key.includes("module"));
  const tagsOptions = TAGS.map((tag) => ({
    label: `${tag.category}: ${tag.label}`,
    value: tag.value,
  }));

  return (
    <SimpleGrid columns={1}>
      <Panel title="Blueprints">
        <Box css={pageCss}>
          <Box css={sidebarCss}>
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
            <Box css={SidebarRow}>
              <Text>Sort order</Text>
              <Box>
                <RadioGroup
                  onChange={(value: string) => router.push(routerQueryToHref({ order: value }))}
                  value={(router.query.order as string) || "favorites"}
                >
                  <Stack>
                    <Radio value="favorites">Favorites</Radio>
                    <Radio value="date">Last updated</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </Box>
            <Box css={SidebarRow}>
              <Text>Search mode</Text>
              <Box>
                <RadioGroup
                  onChange={(value: string) => router.push(routerQueryToHref({ mode: value }))}
                  value={(router.query.mode as string) || "and"}
                >
                  <Stack>
                    <Radio value="and">AND</Radio>
                    <Radio value="or">OR</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </Box>
            <Box css={SidebarRow}>
              <Text>Tags</Text>
              <Select
                options={tagsOptions}
                value={queryValueAsArray(router.query.tags)}
                onChange={(tags) => router.push(routerQueryToHref({ tags }))}
                css={{ width: "200px", marginRight: "1rem" }}
              />
            </Box>
            <Box css={SidebarRow}>
              <Text>Entities</Text>
              <Select
                options={entityOptions}
                value={queryValueAsArray(router.query.entities)}
                onChange={(entities) => router.push(routerQueryToHref({ entities }))}
                css={{ width: "200px", marginRight: "1rem" }}
              />
            </Box>
            <Box css={SidebarRow}>
              <Text>Recipes</Text>
              <Select
                options={recipeOptions}
                value={queryValueAsArray(router.query.recipes)}
                onChange={(recipes) => router.push(routerQueryToHref({ recipes }))}
                css={{ width: "200px", marginRight: "1rem" }}
              />
            </Box>
            <Box css={SidebarRow}>
              <Text>Items</Text>
              <Select
                options={itemOptions}
                value={queryValueAsArray(router.query.items)}
                onChange={(items) => router.push(routerQueryToHref({ items }))}
                css={{ width: "200px", marginRight: "1rem" }}
              />
            </Box>
            <Box css={sidebarCheckbox}>
              <Text>Snaps to grid</Text>
              <Checkbox
                value="true"
                onChange={(ev) =>
                  router.push(routerQueryToHref({ absolute_snapping: String(ev.target.checked) }))
                }
                isChecked={router.query.absolute_snapping === "true"}
              />
            </Box>
          </Box>
          <Box css={{ display: "flex", flexDirection: "column" }}>
            <Box css={{ display: "flex", flexWrap: "wrap", minHeight: "400px", flexGrow: 1 }}>
              {blueprints.length ? (
                blueprints.map((bp) => <BlueprintLink key={bp.id} blueprint={bp} type="tile" />)
              ) : (
                <p css={{ marginTop: "10px" }}>No results found</p>
              )}
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
  const order = (query["order"] as string) || "favorites";
  const _query = query.q ? String(query.q) : undefined;
  const tags = query.tags ? String(query.tags).split(",") : undefined;
  const entities = query.entities ? String(query.entities).split(",") : undefined;
  const items = query.items ? String(query.items).split(",") : undefined;
  const recipes = query.recipes ? String(query.recipes).split(",") : undefined;
  const user = query.user ? String(query.user) : undefined;
  const absolute_snapping = query.absolute_snapping
    ? String(query.absolute_snapping) === "true"
    : false;
  const mode = String(query.mode).toUpperCase() === "OR" ? "OR" : "AND";

  const { count, rows } = await searchBlueprintPages({
    page,
    perPage,
    query: _query,
    order,
    mode,
    tags,
    entities,
    items,
    recipes,
    user,
    absolute_snapping,
  });

  return {
    props: {
      totalItems: count,
      currentPage: page,
      totalPages: Math.ceil(count / perPage),
      blueprints: rows.map((row) => ({
        id: row.id,
        image_hash: row.image_hash,
        favorite_count: row.favorite_count,
        title: row.title,
        updated_at: row.updated_at,
      })),
    } as IndexProps,
  };
}

export default Index;
