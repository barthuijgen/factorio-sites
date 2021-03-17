import React, { useEffect, useState } from "react";
import { Grid, Box } from "@chakra-ui/react";
import { Blueprint as IBlueprint, BlueprintPage, BlueprintStringData } from "@factorio-sites/types";
import { chakraResponsive, parseBlueprintStringClient } from "@factorio-sites/web-utils";
import { Panel } from "../../components/Panel";
import { Markdown } from "../../components/Markdown";
import { CopyButton } from "../../components/CopyButton";
import { ImageEditor } from "../../components/ImageEditor";
import styled from "@emotion/styled";
import { FavoriteButton } from "./FavoriteButton";
import { useUrl } from "../../hooks/url.hook";
import { BlueprintData } from "./BlueprintData";
import { BlueprintInfo } from "./BlueprintInfo";
import { BlueprintTags } from "./BlueprintTags";
import { BlueprintEntities } from "./BlueprintEntities";
import { FactorioCode } from "../FactorioCode";

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
    &.child-tree {
      overflow: hidden;
      position: relative;
      .child-tree-wrapper {
        height: 483px;
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
  const url = useUrl();
  const [string, setString] = useState<string | null>(null);
  const [data, setData] = useState<BlueprintStringData | null>(null);

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
        gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 2" })}
        gridRow={chakraResponsive({ mobile: null, desktop: "1" })}
        title={
          <div className="title">
            <span className="text">{blueprint_page.title}</span>
            <FavoriteButton is_favorite={favorite} blueprint_page_id={blueprint_page.id} />
          </div>
        }
      >
        <StyledMarkdown>{blueprint_page.description_markdown}</StyledMarkdown>
      </Panel>

      <Panel
        title="Info"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 2" })}
        gridRow={chakraResponsive({ mobile: null, desktop: "2" })}
      >
        <BlueprintInfo blueprint_page={blueprint_page} />
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

      <Panel
        title="Blueprint data"
        className="bp-strings"
        gridColumn={chakraResponsive({ mobile: "1", desktop: "1 / span 4" })}
      >
        {string && data && <BlueprintData string={string} data={data} />}
      </Panel>
    </StyledBlueptintPage>
  );
};
