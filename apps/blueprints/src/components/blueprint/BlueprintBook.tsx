import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Box, Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  BlueprintBook,
  Blueprint,
  BlueprintPage,
  BlueprintStringData,
} from "@factorio-sites/types";
import { chakraResponsive, parseBlueprintStringClient } from "@factorio-sites/web-utils";
import { Panel } from "../../components/Panel";
import { Markdown } from "../../components/Markdown";
import {
  BlueprintBookItem,
  BookChildTree,
  convertBlueprintBookDataToTree,
  mergeChildTreeWithTreeItem,
} from "../../components/BookChildTree";
import { CopyButton } from "../../components/CopyButton";
import { useUrl } from "../../hooks/url.hook";
import { FavoriteButton } from "./FavoriteButton";
import { BlueprintData } from "./BlueprintData";
import { BlueprintInfo } from "./BlueprintInfo";
import { BlueprintTags } from "./BlueprintTags";
import { BlueprintEntities } from "./BlueprintEntities";
import { FactorioCode } from "../FactorioCode";
import { BlueprintImage, RENDERERS } from "./BlueprintImage";
import { Button } from "../Button";
import { useAuth } from "../../providers/auth";
import { PUBLIC_URL } from "../../utils/env";
import { Comments } from "../Comments";

const StyledBlueptintPage = styled(Grid)`
  grid-gap: 16px;

  .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 0.5rem;
    flex-grow: 1;
  }
`;

const descriptionCss = css({
  hr: {
    marginLeft: "-64px",
    marginRight: "-64px",
    border: "none",
    height: "2px",
    margin: "12px auto",
    boxShadow: "inset 0 1px 1px 0 #131313, inset 0 -1px 1px 0 #838383, 0 0 4px 0 #392f2e",
  },
});

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
  const auth = useAuth();
  const url = useUrl();
  const [selectedBlueprintString, setSelectedBlueprintString] = useState<string | null>(null);
  // const [bookChildTreeData, setBookChildTreeData] = useState<ChildTreeBlueprintBookEnriched | null>(
  //   null
  // );
  const [mainBookData, setMainBookData] = useState<BlueprintStringData | null>(null);
  const [selectedData, setSelectedData] = useState<BlueprintStringData | null>(null);
  const [renderer, setRenderer] = useState<RENDERERS | null>(null);
  const selectedHash = selected.data.blueprint_hash;
  const showEntities = selected.type === "blueprint" && selectedData?.blueprint;

  useEffect(() => {
    fetch(`/api/string/${blueprint_book.blueprint_hash}`)
      .then((res) => res.text())
      .then((string) => {
        const data = parseBlueprintStringClient(string);
        if (data) {
          setMainBookData(data);
        }
      })
      .catch((reason) => console.error(reason));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookChildTreeData = useMemo(() => {
    if (mainBookData?.blueprint_book) {
      return mergeChildTreeWithTreeItem(
        convertBlueprintBookDataToTree(mainBookData.blueprint_book),
        blueprint_book.id,
        blueprint_book.child_tree
      ) as BlueprintBookItem;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainBookData]);

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
      <Head>
        <title>
          {(blueprint_page.title ? `${blueprint_page.title} - ` : "") + "Factorio blueprints"}
        </title>
        <meta
          property="og:title"
          content={
            (blueprint_page.title ? `${blueprint_page.title} - ` : "") + "Factorio blueprints"
          }
          key="title"
        />
        <meta
          property="og:image"
          content={`https://storage.googleapis.com/blueprint-images/300/${blueprint_page.image_hash}.webp`}
        />
      </Head>
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
              book_item={bookChildTreeData}
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
            {renderer === "fbe" && (
              <img
                src={`${PUBLIC_URL}/fbe.svg`}
                alt="Factorio blueprint editor"
                style={{ display: "inline-block", height: "24px", marginLeft: "10px" }}
              />
            )}
            <Box css={{ display: "inline-block", flexGrow: 1, textAlign: "right" }}>
              {auth?.user_id === blueprint_page.user_id && (
                <Link href={`/user/blueprint/${blueprint_page.id}`} passHref>
                  <a css={{ marginRight: "1rem" }}>
                    <Button>Edit</Button>
                  </a>
                </Link>
              )}
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
        {selectedBlueprintString && (
          <BlueprintImage
            string={selectedBlueprintString}
            label={selected.data.label || ""}
            blueprint_hash={selected.data.blueprint_hash}
            image_hash={selected.type === "blueprint" ? selected.data.image_hash : undefined}
            onSetRenderer={setRenderer}
          />
        )}
      </Panel>

      <Panel
        title="Description"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 2" })}
        gridRow={chakraResponsive({ mobile: null, desktop: "2 / span 2" })}
        css={descriptionCss}
      >
        <StyledMarkdown>{blueprint_page.description_markdown}</StyledMarkdown>
        {(selectedData?.blueprint?.description || selectedData?.blueprint_book?.description) && (
          <>
            <hr />
            <StyledMarkdown>
              {selectedData?.blueprint?.description ||
                selectedData?.blueprint_book?.description ||
                ""}
            </StyledMarkdown>
          </>
        )}
      </Panel>

      <Panel
        title="Info"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "3 / span 2" })}
        gridRow={chakraResponsive({ mobile: null, desktop: "2" })}
      >
        <BlueprintInfo
          blueprint_page={blueprint_page}
          version={mainBookData?.blueprint_book?.version}
        />
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
          title={<span>Components</span>}
        >
          {selectedData && <BlueprintEntities data={selectedData} />}
        </Panel>
      )}

      <Panel title="Comments" gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 4" })}>
        <Comments blueprint_page_id={blueprint_page.id} />
      </Panel>

      <Panel
        className="bp-strings"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 4" })}
        title={
          <>
            <span css={{ marginRight: "5px" }}>{`data for ${selected.type.replace(
              "_",
              " "
            )}`}</span>
            {selectedData?.blueprint?.label && <FactorioCode code={selectedData.blueprint.label} />}
          </>
        }
      >
        {selectedBlueprintString && (
          <BlueprintData
            string={selectedBlueprintString}
            data={selectedData}
            onRequestData={onRequestData}
          />
        )}
      </Panel>

      {(auth?.role === "admin" || auth?.role === "moderator") && (
        <Panel
          gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 4" })}
          title="Moderation"
        >
          <Link href={`/user/blueprint/${blueprint_page.id}`} passHref>
            <a>
              <Button>Edit</Button>
            </a>
          </Link>
        </Panel>
      )}
    </StyledBlueptintPage>
  );
};
