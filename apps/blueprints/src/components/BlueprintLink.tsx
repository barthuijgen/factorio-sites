import Link from "next/link";
import { css } from "@emotion/react";
import { BlueprintPage } from "@factorio-sites/database";
import { Box, Text } from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";

const linkStyles = css`
  width: 100%;
  margin: 5px 0;
  a {
    display: block;
    padding: 5px;
    color: #fff;
  }
  &:hover {
    cursor: pointer;
    background: #ccc;
  }
`;

const formatDate = (datenum: number) => {
  const date = new Date(datenum * 1000);
  return date.toLocaleString();
};

interface BlueprintLinkProps {
  blueprint: BlueprintPage;
  editLink?: boolean;
}

export const BlueprintLink: React.FC<BlueprintLinkProps> = ({ blueprint, editLink }) => (
  <div css={linkStyles}>
    <Link
      href={editLink ? `/user/blueprint/${blueprint.id}` : `/blueprint/${blueprint.id}`}
      passHref
    >
      <a>
        <Box css={{ display: "flex", justifyContent: "space-between" }}>
          <Text>{blueprint.title}</Text>
          <Box css={{ display: "flex" }}>
            <Text css={{ display: "flex", alignItems: "center", marginRight: "2rem" }}>
              <MdFavorite css={{ marginRight: "0.5rem" }} />
              {blueprint.favorite_count}
            </Text>
            <Text>{formatDate(blueprint.updated_at)}</Text>
          </Box>
        </Box>
      </a>
    </Link>
  </div>
);
