import Link from "next/link";
import styled from "@emotion/styled";
import { format } from "date-fns";
import { Box, Text } from "@chakra-ui/react";
import { MdFavorite, MdDeleteForever } from "react-icons/md";
import { BlueprintPage } from "@factorio-sites/types";
import { getLocaleDateFormat } from "@factorio-sites/web-utils";
import clsx from "clsx";
import { Button } from "./Button";

const StyledBlueprintLink = styled.div`
  display: flex;
  /* margin: 5px 0; */

  .link-box {
    width: 100%;
    height: 36px;
    margin-right: 5px;
    padding: 5px;
    background-color: #313031;
    box-shadow: inset 3px 0 3px -3px #201815, inset 2px 0 2px -2px #201815,
      inset 1px 0 1px -1px #201815, inset 0 3px 3px -3px #8f8c8b, inset 0 2px 2px -2px #8f8c8b,
      inset 0 1px 1px -1px #8f8c8b, inset -3px 0 3px -3px #201815, inset -2px 0 2px -2px #201815,
      inset -2px 0 1px -1px #201815, inset 0 -3px 3px -3px #000, inset 0 -2px 2px -2px #000,
      inset 0 -1px 1px -1px #000, 0 0 2px 0 #201815, 0 0 4px 0 #201815;

    .block {
      display: flex;
      justify-content: space-between;
    }

    .details {
      display: flex;
    }

    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    a {
      display: block;
      color: #fff;
    }

    &:hover {
      cursor: pointer;
      background: #4c4c4c;
    }

    &.tile {
      width: 210px;
      height: 232px;
      .block {
        flex-direction: column;
      }
    }
  }

  .delete {
    padding: 2px;
    width: 36px;
    justify-content: center;
  }
`;

interface BlueprintLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  blueprint: Pick<BlueprintPage, "id" | "title" | "image_hash" | "favorite_count" | "updated_at">;
  editLink?: boolean;
  onDelete?: (id: string) => void;
  disableDelete?: boolean;
}

export const BlueprintLink: React.FC<BlueprintLinkProps> = ({
  blueprint,
  editLink,
  onDelete,
  disableDelete,
  className,
}) => {
  return (
    <StyledBlueprintLink className={clsx("blueprint-link", className)}>
      <Box className="link-box">
        <Link
          href={editLink ? `/user/blueprint/${blueprint.id}` : `/blueprint/${blueprint.id}`}
          passHref
        >
          <a>
            <Box className="block">
              <Box className="details">
                <Text css={{ display: "flex", alignItems: "center", marginRight: "1rem" }}>
                  <MdFavorite css={{ marginRight: "5px" }} />
                  {blueprint.favorite_count || "0"}
                </Text>
                <Text className="title">{blueprint.title}</Text>
              </Box>
              <Box>
                <Text>{format(blueprint.updated_at * 1000, getLocaleDateFormat(true))}</Text>
              </Box>
            </Box>
          </a>
        </Link>
      </Box>
      <Button
        className="delete"
        danger
        disabled={disableDelete}
        onClick={() => onDelete?.(blueprint.id)}
      >
        <MdDeleteForever size={18} />
      </Button>
    </StyledBlueprintLink>
  );
};
