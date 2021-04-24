import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Grid, Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Blueprint as IBlueprint, BlueprintPage, BlueprintStringData } from "@factorio-sites/types";
import { chakraResponsive, parseBlueprintStringClient } from "@factorio-sites/web-utils";
import { Panel } from "../../components/Panel";
import { Markdown } from "../../components/Markdown";
import { CopyButton } from "../../components/CopyButton";
import { FavoriteButton } from "./FavoriteButton";
import { useUrl } from "../../hooks/url.hook";
import { BlueprintData } from "./BlueprintData";
import { BlueprintInfo } from "./BlueprintInfo";
import { BlueprintTags } from "./BlueprintTags";
import { BlueprintEntities } from "./BlueprintEntities";
import { BlueprintImage, RENDERERS } from "./BlueprintImage";
import { useAuth } from "../../providers/auth";
import { Button } from "../Button";
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

  .panel {
    &.child-tree {
      overflow: hidden;
      position: relative;
      .child-tree-wrapper {
        height: 483px;
        overflow: auto;
      }
    }
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

interface BlueprintProps {
  blueprint: IBlueprint;
  blueprint_page: BlueprintPage;
  favorite: boolean;
}

export const BlueprintSubPage: React.FC<BlueprintProps> = ({
  blueprint,
  blueprint_page,
  favorite,
}) => {
  const auth = useAuth();
  const url = useUrl();
  const [string, setString] = useState<string | null>(null);
  const [data, setData] = useState<BlueprintStringData | null>(null);
  const [renderer, setRenderer] = useState<RENDERERS | null>(null);

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
    <StyledBlueptintPage
      templateColumns={chakraResponsive({ mobile: "1fr", desktop: "1fr 1fr 1fr 1fr" })}
    >
      <Panel
        className="image"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "3 / span 2" })}
        gridRow="1"
        title={
          <>
            <span>Image</span>
            {renderer === "fbe" && (
              <img
                src={`${PUBLIC_URL}/fbe.svg`}
                alt="Factorio blueprint editor"
                css={{ display: "inline-block", height: "24px", marginLeft: "10px" }}
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
          </>
        }
      >
        {string && (
          <BlueprintImage
            string={string}
            label={blueprint.label || ""}
            blueprint_hash={blueprint.blueprint_hash}
            onSetRenderer={setRenderer}
          />
        )}
      </Panel>

      <Panel
        gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 2" })}
        gridRow={chakraResponsive({ mobile: null, desktop: "1" })}
        title={
          <>
            <span className="text">{blueprint_page.title}</span>
            <FavoriteButton is_favorite={favorite} blueprint_page_id={blueprint_page.id} />
          </>
        }
        css={descriptionCss}
      >
        <StyledMarkdown>{blueprint_page.description_markdown}</StyledMarkdown>
        {blueprint.description && (
          <>
            <hr />
            <StyledMarkdown>{blueprint.description}</StyledMarkdown>
          </>
        )}
      </Panel>

      <Panel
        title="Info"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 2" })}
        gridRow={chakraResponsive({ mobile: null, desktop: "2" })}
      >
        <BlueprintInfo blueprint_page={blueprint_page} version={blueprint.game_version} />
      </Panel>

      <Panel
        title="Tags"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "3" })}
        gridRow={chakraResponsive({ mobile: null, desktop: "2" })}
      >
        <BlueprintTags blueprint_page={blueprint_page} />
      </Panel>

      <Panel
        className="entities"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "4" })}
        title={<span>Components</span>}
      >
        {data && <BlueprintEntities data={data} />}
      </Panel>

      <Panel title="Comments" gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 4" })}>
        <Comments blueprint_page_id={blueprint_page.id} />
      </Panel>

      <Panel
        title="Blueprint data"
        className="bp-strings"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 4" })}
      >
        {string && data && <BlueprintData string={string} data={data} />}
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
