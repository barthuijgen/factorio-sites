import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import BBCode from "bbcode-to-react";
import { Image, Box, Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";
import {
  getBlueprintBookById,
  getBlueprintById,
  getBlueprintPageWithUserById,
  isBlueprintPageUserFavorite,
} from "@factorio-sites/database";
import {
  BlueprintBook,
  Blueprint,
  BlueprintPage,
  BlueprintStringData,
} from "@factorio-sites/types";
import { TAGS_BY_KEY, timeLogger } from "@factorio-sites/common-utils";
import {
  chakraResponsive,
  ChildTreeBlueprintBookEnriched,
  mergeBlueprintDataAndChildTree,
  parseBlueprintStringClient,
} from "@factorio-sites/web-utils";
import { Panel } from "../../components/Panel";
import { Markdown } from "../../components/Markdown";
import { BookChildTree } from "../../components/BookChildTree";
import { CopyButton } from "../../components/CopyButton";
import { ImageEditor } from "../../components/ImageEditor";
import { useAuth } from "../../providers/auth";
import { pageHandler } from "../../utils/page-handler";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Button } from "../../components/Button";
import clsx from "clsx";

const StyledBlueptintPage = styled(Grid)`
  grid-gap: 16px;

  .title {
    position: relative;
    width: 100%;

    .text {
      white-space: nowrap;
      width: calc(100% - 120px);
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .panel {
    &.image {
      height: 564px;
    }
    &.child-tree {
      overflow: hidden;
      height: 564px;
      position: relative;
      .child-tree-wrapper {
        height: 100%;
        overflow: auto;
      }
    }
    &.info {
      dl {
        display: flex;
        dt {
          width: 65%;
          font-weight: 600;
        }
        dd {
          width: 35%;
          text-align: right;
        }
      }

      hr {
        margin-left: -64px;
        margin-right: -64px;
        border: none;
        height: 2px;
        margin: 12px auto;
        box-shadow: inset 0 1px 1px 0 #131313, inset 0 -1px 1px 0 #838383, 0 0 4px 0 #392f2e;
      }
    }

    &.tags {
      text-align: left;

      .tag {
        display: inline-block;
        margin: 3px;
        padding: 0 3px;
        background: #313131;
        border-radius: 3px;
      }
    }

    &.entities table {
      width: 100%;

      td {
        border: 1px solid #909090;
      }
      td:not(.no-padding) {
        padding: 5px 10px;
      }
    }
  }
`;

type Selected =
  | { type: "blueprint"; data: Pick<Blueprint, "id" | "blueprint_hash" | "image_hash" | "label"> }
  | { type: "blueprint_book"; data: Pick<BlueprintBook, "id" | "blueprint_hash" | "label"> };

interface IndexProps {
  selected: Selected;
  blueprint: Blueprint | null;
  blueprint_book: BlueprintBook | null;
  blueprint_page: BlueprintPage;
  favorite: boolean;
}

export const Index: NextPage<IndexProps> = ({
  selected,
  blueprint,
  blueprint_book,
  blueprint_page,
  favorite,
}) => {
  const auth = useAuth();
  const [selectedBlueprintString, setSelectedBlueprintString] = useState<string | null>(null);
  const [bookChildTreeData, setBookChildTreeData] = useState<ChildTreeBlueprintBookEnriched | null>(
    null
  );
  const [selectedData, setSelectedData] = useState<BlueprintStringData | null>(null);
  const [showDetails, setShowDetails] = useState<"string" | "json" | "none">("none");
  const [isFavorite, setIsFavorite] = useState(favorite);
  const selectedHash = selected.data.blueprint_hash;
  const isBlueprintBook = Boolean(blueprint_book);
  // const isBlueprintBookChild = isBlueprintBook && selected.type === "blueprint";
  const showEntities = selected.type === "blueprint" && selectedData?.blueprint;

  useEffect(() => {
    const hash = blueprint_book ? blueprint_book.blueprint_hash : blueprint?.blueprint_hash;
    fetch(`/api/string/${hash}`)
      .then((res) => res.text())
      .then((string) => {
        const data = parseBlueprintStringClient(string);
        if (data && blueprint_book) {
          setBookChildTreeData(
            mergeBlueprintDataAndChildTree(data, {
              id: blueprint_book.id,
              name: blueprint_book.label,
              type: "blueprint_book",
              children: blueprint_book.child_tree,
            })
          );
        }
      })
      .catch((reason) => console.error(reason));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(`/api/string/${selectedHash}`)
      .then((res) => res.text())
      .then((string) => {
        setShowDetails("none");
        setSelectedBlueprintString(string);
        if (selected.type === "blueprint") {
          const data = parseBlueprintStringClient(string);
          setSelectedData(data);
        } else {
          setSelectedData(null);
        }
      })
      .catch((reason) => console.error(reason));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHash]);

  useEffect(() => {
    console.log({
      selected,
      blueprint,
      blueprint_book,
      blueprint_page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickFavorite = async () => {
    const result = await fetch("/api/user/favorite", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ blueprint_page_id: blueprint_page.id }),
    }).then((res) => res.json());
    setIsFavorite(result.favorite);
  };

  return (
    <StyledBlueptintPage
      className={clsx({ "bp-book": isBlueprintBook })}
      templateColumns={chakraResponsive({ mobile: "1fr", desktop: "1fr 1fr" })}
    >
      {isBlueprintBook && bookChildTreeData && (
        <Panel className="child-tree" gridColumn="1" gridRow="1">
          <div className="child-tree-wrapper">
            <BookChildTree
              blueprint_book={bookChildTreeData}
              base_url={`/blueprint/${blueprint_page.id}`}
              selected_id={selected.data.id}
            />
          </div>
        </Panel>
      )}

      <Panel
        className="image"
        gridColumn="2"
        title={
          <>
            <span>Image</span>
            <img
              src="/fbe.svg"
              alt="Factorio blueprint editor"
              css={{ height: "24px", marginLeft: "10px" }}
            />
          </>
        }
      >
        {selectedBlueprintString && <ImageEditor string={selectedBlueprintString}></ImageEditor>}
      </Panel>

      <Panel
        className="description"
        gridColumn="1"
        gridRow={isBlueprintBook ? "2 / span 2" : "1"}
        title={
          <div className="title">
            <span className="text">{blueprint_page.title}</span>
            {auth && (
              <Button
                onClick={onClickFavorite}
                css={{ display: "inline-flex", float: "right", fontSize: "initial" }}
              >
                Favorite
                <span className="icon" css={{ marginLeft: "5px" }}>
                  {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
                </span>
              </Button>
            )}
          </div>
        }
        bottom={
          <div css={{ display: "flex", justifyContent: "flex-end" }}>
            {selectedBlueprintString && (
              <CopyButton
                css={{ marginRight: 16 }}
                label="Copy Blueprint"
                content={selectedBlueprintString}
              />
            )}
            {selected.data.blueprint_hash && typeof window !== "undefined" && (
              <CopyButton
                label="Copy URL"
                content={`${window.location.origin}/api/string/${selected.data.blueprint_hash}`}
              />
            )}
          </div>
        }
      >
        <Markdown>{blueprint_page.description_markdown}</Markdown>
      </Panel>

      <Panel className="info" gridColumn={isBlueprintBook ? "2" : "1"} gridRow="2" title={"Info"}>
        <Box>
          <dl>
            <dt>User:</dt>
            <dd>
              {blueprint_page.user ? (
                <Link href={`/?user=${blueprint_page.user?.id}`}>
                  <a>{blueprint_page.user?.username}</a>
                </Link>
              ) : (
                "-"
              )}
            </dd>
          </dl>
          <hr />
          <dl>
            <dt>Last updated:</dt>
            <dd>{new Date(blueprint_page.updated_at * 1000).toLocaleDateString()}</dd>
          </dl>
          <hr />
          <dl>
            <dt>Created:</dt>
            <dd>{new Date(blueprint_page.created_at * 1000).toLocaleDateString()}</dd>
          </dl>
          <hr />
          <dl>
            <dt>Favorites:</dt>
            <dd>{blueprint_page.favorite_count || "0"}</dd>
          </dl>
        </Box>
      </Panel>

      <Panel className="tags" gridColumn="2" gridRow={isBlueprintBook ? "3" : "2"} title={"Tags"}>
        {blueprint_page.tags.map((tag) => (
          <span key={tag} className="tag">
            {TAGS_BY_KEY[tag].category}: {TAGS_BY_KEY[tag].label}
          </span>
        ))}
      </Panel>

      {showEntities && (
        <Panel
          className="entities"
          gridColumn="1 / span 2"
          title={
            <span>
              Entities for{" "}
              {selectedData?.blueprint?.label
                ? BBCode.toReact(selectedData.blueprint.label)
                : "blueprint"}
            </span>
          }
        >
          <table>
            <tbody>
              {selectedData?.blueprint?.entities &&
                Object.entries(
                  selectedData.blueprint.entities.reduce<Record<string, number>>(
                    (entities, entity) => {
                      if (entities[entity.name]) {
                        entities[entity.name]++;
                      } else {
                        entities[entity.name] = 1;
                      }
                      return entities;
                    },
                    {}
                  )
                )
                  .sort((a, b) => b[1] - a[1])
                  .map(([entry_name, entry]) => (
                    <tr key={entry_name}>
                      <td className="no-padding">
                        <Image
                          alt={entry_name.replace(/-/g, " ")}
                          src={`https://factorioprints.com/icons/${entry_name}.png`}
                          fallbackSrc="https://storage.googleapis.com/factorio-blueprints-assets/error-icon.png"
                          width="32px"
                          height="32px"
                        />
                      </td>
                      <td>{entry_name}</td>
                      <td>{entry}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </Panel>
      )}

      <Panel
        className="bp-strings"
        gridColumn="1 / span 2"
        title={`data for ${selected.type.replace("_", " ")} "${selected.data.label}"`}
      >
        <Box>
          <Button
            onClick={() => {
              setShowDetails(showDetails === "string" ? "none" : "string");
            }}
          >
            {showDetails === "string" ? "Hide" : "Show"} string
          </Button>
          <Button
            css={{ marginLeft: "1rem" }}
            onClick={() => {
              setShowDetails(showDetails === "json" ? "none" : "json");
              if (!selectedData) {
                fetch(`/api/string/${selectedHash}`)
                  .then((res) => res.text())
                  .then((string) => {
                    const data = parseBlueprintStringClient(string);
                    setSelectedData(data);
                  });
              }
            }}
          >
            {showDetails === "json" ? "Hide" : "Show"} json
          </Button>
        </Box>
        <Box css={{ marginTop: "1rem" }}>
          {showDetails === "string" && (
            <textarea
              value={selectedBlueprintString || "Loading..."}
              readOnly
              css={{
                width: "100%",
                height: "100px",
                resize: "none",
                color: "#fff",
                backgroundColor: "#414040",
              }}
            />
          )}
          {showDetails === "json" && (
            <pre css={{ maxHeight: "500px", overflowY: "scroll" }}>
              {JSON.stringify(selectedData, null, 2)}
            </pre>
          )}
        </Box>
      </Panel>
    </StyledBlueptintPage>
  );
};

export const getServerSideProps = pageHandler(async (context, { session }) => {
  const throwError = (message: string) => {
    if (!blueprint_page && context.res) {
      context.res.statusCode = 404;
      context.res.end(JSON.stringify({ error: message }));
      return { props: {} };
    }
  };

  const tl = timeLogger("getServerSideProps");
  const selected_id = context.query.selected ? (context.query.selected as string) : null;
  const type = context.query.type ? (context.query.type as string) : null;
  const blueprintId = context.query.blueprintId ? (context.query.blueprintId as string) : null;

  if (!blueprintId) return throwError("Blueprint ID not found");

  const blueprint_page = await getBlueprintPageWithUserById(blueprintId);
  tl("getBlueprintPageWithUserById");

  if (!blueprint_page) return throwError("Blueprint page not found");

  let blueprint: IndexProps["blueprint"] = null;
  let blueprint_book: IndexProps["blueprint_book"] = null;
  let selected!: IndexProps["selected"];
  let selected_blueprint!: Blueprint | null;
  let selected_blueprint_book!: BlueprintBook | null;

  if (blueprint_page.blueprint_id) {
    blueprint = await getBlueprintById(blueprint_page.blueprint_id);
    selected_blueprint = blueprint;
    tl("getBlueprintById");
  } else if (blueprint_page.blueprint_book_id) {
    blueprint_book = await getBlueprintBookById(blueprint_page.blueprint_book_id);
    if (selected_id && type === "book") {
      selected_blueprint_book = await getBlueprintBookById(selected_id);
      tl("getBlueprintBookById");
    } else if (selected_id && type !== "book") {
      selected_blueprint = await getBlueprintById(selected_id);
      tl("getBlueprintById");
    } else if (blueprint_book) {
      selected_blueprint_book = blueprint_book;
    }
  }

  if (selected_blueprint) {
    selected = {
      type: "blueprint",
      data: {
        id: selected_blueprint.id,
        blueprint_hash: selected_blueprint.blueprint_hash,
        image_hash: selected_blueprint.image_hash,
        label: selected_blueprint.label,
      },
    };
  } else if (selected_blueprint_book) {
    selected = {
      type: "blueprint_book",
      data: {
        id: selected_blueprint_book.id,
        blueprint_hash: selected_blueprint_book.blueprint_hash,
        label: selected_blueprint_book.label,
      },
    };
  }

  const favorite = session
    ? !!(await isBlueprintPageUserFavorite(session.user.id, blueprint_page.id))
    : false;

  return {
    props: {
      blueprint,
      blueprint_book,
      selected,
      blueprint_page,
      favorite,
    } as IndexProps,
  };
});

export default Index;
