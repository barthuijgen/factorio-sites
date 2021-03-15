import React, { useEffect, useState } from "react";
import Link from "next/link";
import BBCode from "bbcode-to-react";
import { Grid, Image, Box } from "@chakra-ui/react";
import { format } from "date-fns";
import { Blueprint as IBlueprint, BlueprintPage, BlueprintStringData } from "@factorio-sites/types";
import { TAGS_BY_KEY } from "@factorio-sites/common-utils";
import { chakraResponsive, parseBlueprintStringClient } from "@factorio-sites/web-utils";
import { Panel } from "../../components/Panel";
import { Markdown } from "../../components/Markdown";
import { CopyButton } from "../../components/CopyButton";
import { ImageEditor } from "../../components/ImageEditor";
import styled from "@emotion/styled";
import { Button } from "../../components/Button";
import { FavoriteButton } from "./FavoriteButton";
import { useUrl } from "../../hooks/url.hook";

const StyledBlueptintPage = styled(Grid)`
  grid-gap: 16px;

  .title {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;

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
      height: 579px;
    }
    &.child-tree {
      overflow: hidden;
      height: 579px;
      position: relative;
      .child-tree-wrapper {
        height: 483px;
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
      td {
        border: 1px solid #909090;
      }
      td:not(.no-padding) {
        padding: 5px 10px;
      }
    }

    .description {
      max-height: 600px;
    }
  }
`;

const StyledMarkdown = styled(Markdown)`
  max-height: 600px;
`;

interface BlueprintProps {
  blueprint: Pick<IBlueprint, "id" | "blueprint_hash" | "image_hash" | "label">;
  blueprint_page: BlueprintPage;
  favorite: boolean;
}

export const BlueprintSubPage: React.FC<BlueprintProps> = ({
  blueprint,
  blueprint_page,
  favorite,
}) => {
  const url = useUrl();
  const [string, setString] = useState<string | null>(null);
  const [data, setData] = useState<BlueprintStringData | null>(null);
  const [showDetails, setShowDetails] = useState<"string" | "json" | "none">("none");

  useEffect(() => {
    fetch(`/api/string/${blueprint.blueprint_hash}`)
      .then((res) => res.text())
      .then((string) => {
        setString(string);
        const data = parseBlueprintStringClient(string);
        setData(data);
      })
      .catch((reason) => console.error(reason));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledBlueptintPage templateColumns={chakraResponsive({ mobile: "1fr", desktop: "1fr 1fr" })}>
      <Panel
        className="image"
        gridColumn="2"
        title={
          <div className="title">
            <span>Image</span>
            <img
              src="/fbe.svg"
              alt="Factorio blueprint editor"
              css={{ display: "inline-block", height: "24px", marginLeft: "10px" }}
            />
            <Box css={{ display: "inline-block", flexGrow: 1, textAlign: "right" }}>
              {string && (
                <CopyButton
                  primary
                  css={{ marginRight: "1rem" }}
                  label="Copy Blueprint"
                  content={string}
                />
              )}
              {blueprint.blueprint_hash && url && (
                <CopyButton
                  label="Copy URL"
                  content={`${url.origin}/api/string/${blueprint.blueprint_hash}`}
                />
              )}
            </Box>
          </div>
        }
      >
        {string && <ImageEditor string={string}></ImageEditor>}
      </Panel>

      <Panel
        className="description"
        gridColumn="1"
        gridRow="1"
        title={
          <div className="title">
            <span className="text">{blueprint_page.title}</span>
            <FavoriteButton is_favorite={favorite} blueprint_page_id={blueprint_page.id} />
          </div>
        }
      >
        <StyledMarkdown>{blueprint_page.description_markdown}</StyledMarkdown>
      </Panel>

      <Panel title="Info" className="info" gridColumn="1" gridRow="2">
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
            <dd>{format(new Date(blueprint_page.updated_at * 1000), "DD/mm/YYYY")}</dd>
          </dl>
          <hr />
          <dl>
            <dt>Created:</dt>
            <dd>{format(new Date(blueprint_page.created_at * 1000), "DD/mm/YYYY")}</dd>
          </dl>
          <hr />
          <dl>
            <dt>Favorites:</dt>
            <dd>{blueprint_page.favorite_count || "0"}</dd>
          </dl>
        </Box>
      </Panel>

      <Panel className="tags" gridColumn="2" gridRow="2" title="Tags">
        {blueprint_page.tags.length ? (
          blueprint_page.tags.map((tag) => (
            <span key={tag} className="tag">
              {TAGS_BY_KEY[tag].category}: {TAGS_BY_KEY[tag].label}
            </span>
          ))
        ) : (
          <div>No tags have been added yet</div>
        )}
      </Panel>

      <Panel
        className="entities"
        gridColumn="1 / span 2"
        title={
          <span>
            Entities for{" "}
            {data?.blueprint?.label ? BBCode.toReact(data.blueprint.label) : "blueprint"}
          </span>
        }
      >
        <table>
          <tbody>
            {data?.blueprint?.entities &&
              Object.entries(
                data.blueprint.entities.reduce<Record<string, number>>((entities, entity) => {
                  if (entities[entity.name]) {
                    entities[entity.name]++;
                  } else {
                    entities[entity.name] = 1;
                  }
                  return entities;
                }, {})
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

      <Panel className="bp-strings" gridColumn="1 / span 2" title="Blueprint data">
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
            }}
          >
            {showDetails === "json" ? "Hide" : "Show"} json
          </Button>
        </Box>
        <Box css={{ marginTop: "1rem" }}>
          {showDetails === "string" && (
            <textarea
              value={string || "Loading..."}
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
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </Box>
      </Panel>
    </StyledBlueptintPage>
  );
};
