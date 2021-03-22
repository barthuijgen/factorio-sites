import { Box } from "@chakra-ui/react";
import { format } from "date-fns";
import Link from "next/link";
import styled from "@emotion/styled";
import { BlueprintPage } from "@factorio-sites/types";
import { getLocaleDateFormat } from "@factorio-sites/web-utils";

const StyledBox = styled(Box)`
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
`;

interface BlueprintInfoProps {
  blueprint_page: BlueprintPage;
}

export const BlueprintInfo: React.FC<BlueprintInfoProps> = ({ blueprint_page }) => {
  return (
    <StyledBox>
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
        <dd>{format(new Date(blueprint_page.updated_at * 1000), getLocaleDateFormat())}</dd>
      </dl>
      <hr />
      <dl>
        <dt>Created:</dt>
        <dd>{format(new Date(blueprint_page.created_at * 1000), getLocaleDateFormat())}</dd>
      </dl>
      <hr />
      <dl>
        <dt>Favorites:</dt>
        <dd>{blueprint_page.favorite_count || "0"}</dd>
      </dl>
    </StyledBox>
  );
};
