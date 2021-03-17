import React, { useEffect, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";
import {
  BlueprintBook,
  Blueprint,
  BlueprintPage,
  BlueprintStringData,
} from "@factorio-sites/types";
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
import { useUrl } from "../../hooks/url.hook";
import { FavoriteButton } from "./FavoriteButton";
import { BlueprintData } from "./BlueprintData";
import { BlueprintInfo } from "./BlueprintInfo";
import { BlueprintTags } from "./BlueprintTags";
import { BlueprintEntities } from "./BlueprintEntities";
import { FactorioCode } from "../FactorioCode";

const StyledBlueptintPage = styled(Grid)`
  grid-gap: 16px;

  .title .text {
    white-space: nowrap;
    width: calc(100% - 120px);
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .panel {
    &.child-tree {
      overflow: hidden;
      position: relative;
      .child-tree-wrapper {
        height: 480px;
        overflow: auto;
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

type Selected =
  | { type: "blueprint"; data: Pick<Blueprint, "id" | "blueprint_hash" | "image_hash" | "label"> }
  | { type: "blueprint_book"; data: Pick<BlueprintBook, "id" | "blueprint_hash" | "label"> };

interface BlueprintBookSubPageProps {
  selected: Selected;
  blueprint_book: BlueprintBook;
  blueprint_page: BlueprintPage;
  favorite: boolean;
}

export const BlueprintBookSubPage: React.FC<BlueprintBookSubPageProps> = ({
  selected,
  blueprint_book,
  blueprint_page,
  favorite,
}) => {
  const url = useUrl();
  const [selectedBlueprintString, setSelectedBlueprintString] = useState<string | null>(null);
  const [bookChildTreeData, setBookChildTreeData] = useState<ChildTreeBlueprintBookEnriched | null>(
    null
  );
  const [selectedData, setSelectedData] = useState<BlueprintStringData | null>(null);
  const selectedHash = selected.data.blueprint_hash;
  const showEntities = selected.type === "blueprint" && selectedData?.blueprint;

  useEffect(() => {
    fetch(`/api/string/${blueprint_book.blueprint_hash}`)
      .then((res) => res.text())
      .then((string) => {
        const data = parseBlueprintStringClient(string);
        if (data) {
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

  const onRequestData = () => {
    fetch(`/api/string/${selectedHash}`)
      .then((res) => res.text())
      .then((string) => {
        const data = parseBlueprintStringClient(string);
        setSelectedData(data);
      });
  };

  return (
    <StyledBlueptintPage
      className="bp-book"
      templateColumns={chakraResponsive({ mobile: "1fr", desktop: "1fr 1fr 1fr 1fr" })}
    >
      <Panel
        className="child-tree"
        title={
          <>
            <span className="text">{blueprint_page.title}</span>
            <FavoriteButton is_favorite={favorite} blueprint_page_id={blueprint_page.id} />
          </>
        }
        gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 2" })}
        gridRow={chakraResponsive({ mobile: "2", desktop: "1" })}
      >
        {bookChildTreeData && (
          <div className="child-tree-wrapper">
            <BookChildTree
              blueprint_book={bookChildTreeData}
              base_url={`/blueprint/${blueprint_page.id}`}
              selected_id={selected.data.id}
            />
          </div>
        )}
      </Panel>

      <Panel
        className="image"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "3 / span 2" })}
        gridRow={chakraResponsive({ mobile: "1", desktop: "1" })}
        title={
          <>
            <span>Image</span>
            <img
              src="/fbe.svg"
              alt="Factorio blueprint editor"
              css={{ display: "inline-block", height: "24px", marginLeft: "10px" }}
            />
            <Box css={{ display: "inline-block", flexGrow: 1, textAlign: "right" }}>
              {selectedBlueprintString && (
                <CopyButton
                  primary
                  css={{ marginRight: "1rem" }}
                  label="Copy Blueprint"
                  content={selectedBlueprintString}
                />
              )}
              {selected.data.blueprint_hash && url && (
                <CopyButton
                  label="Copy URL"
                  content={`${url.origin}/api/string/${selected.data.blueprint_hash}`}
                />
              )}
            </Box>
          </>
        }
      >
        {selectedBlueprintString && <ImageEditor string={selectedBlueprintString}></ImageEditor>}
      </Panel>

      <Panel
        className="description"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 2" })}
        gridRow={chakraResponsive({ mobile: null, desktop: "2 / span 2" })}
        title={
          <>
            <span className="text">Description </span>
            <FavoriteButton is_favorite={favorite} blueprint_page_id={blueprint_page.id} />
          </>
        }
      >
        <StyledMarkdown>{blueprint_page.description_markdown}</StyledMarkdown>
      </Panel>

      <Panel
        title="Info"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "3 / span 2" })}
        gridRow={chakraResponsive({ mobile: null, desktop: "2" })}
      >
        <BlueprintInfo blueprint_page={blueprint_page} />
      </Panel>

      <Panel
        title="Tags"
        gridColumn={chakraResponsive({ mobile: "1", desktop: showEntities ? "3" : "3 / span 2" })}
        gridRow={chakraResponsive({ mobile: null, desktop: "3" })}
      >
        <BlueprintTags blueprint_page={blueprint_page} />
      </Panel>

      {showEntities && (
        <Panel
          className="entities"
          gridColumn={chakraResponsive({ mobile: "1", desktop: "4" })}
          title={
            <span>
              Components for{" "}
              {selectedData?.blueprint?.label ? (
                <FactorioCode code={selectedData.blueprint.label} />
              ) : (
                "blueprint"
              )}
            </span>
          }
        >
          {selectedData && <BlueprintEntities data={selectedData} />}
        </Panel>
      )}

      <Panel
        className="bp-strings"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 4" })}
        title={`data for ${selected.type.replace("_", " ")} "${selected.data.label}"`}
      >
        {selectedBlueprintString && (
          <BlueprintData
            string={selectedBlueprintString}
            data={selectedData}
            onRequestData={onRequestData}
          />
        )}
      </Panel>
    </StyledBlueptintPage>
  );
};
