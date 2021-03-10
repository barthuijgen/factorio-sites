import Link from "next/link";
import Image from "next/image";
import { css } from "@emotion/react";
import { BlueprintPage } from "@factorio-sites/types";
import { Box, Text } from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";
import { useState } from "react";

const linkStyles = css`
  margin: 5px 10px 5px 0;
  background: #353535;

  .block {
    display: flex;
    justify-content: space-between;
  }

  .image {
    position: relative;
    width: 200px;
    height: 200px;
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
    padding: 5px;
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
`;

const formatDate = (datenum: number) => {
  const date = new Date(datenum * 1000);
  return date.toLocaleString();
};

interface BlueprintLinkProps {
  blueprint: BlueprintPage;
  editLink?: boolean;
  type: "tile" | "row";
}

export const BlueprintLink: React.FC<BlueprintLinkProps> = ({
  blueprint,
  editLink,
  type = "tile",
}) => {
  const [imageError, setImageError] = useState(false);
  const onImageError = () => {
    setImageError(true);
  };

  return (
    <div css={linkStyles} className={type}>
      <Link
        href={editLink ? `/user/blueprint/${blueprint.id}` : `/blueprint/${blueprint.id}`}
        passHref
      >
        <a>
          <Box className="block">
            {type === "tile" && (
              <div className="image">
                {imageError ? (
                  <div>The image is not generated yet, please be patient it will come soon.</div>
                ) : (
                  <Image
                    loader={({ src }) => src}
                    src={`https://storage.googleapis.com/blueprint-images/300/${blueprint.image_hash}.webp`}
                    layout="fill"
                    objectFit="contain"
                    alt={blueprint.title}
                    onError={onImageError}
                  />
                )}
              </div>
            )}
            <Box className="details">
              <Text css={{ display: "flex", alignItems: "center", marginRight: "1rem" }}>
                <MdFavorite css={{ marginRight: "5px" }} />
                {blueprint.favorite_count || "0"}
              </Text>
              <Text className="title">{blueprint.title}</Text>
            </Box>
            {type === "row" && (
              <Box>
                <Text>{formatDate(blueprint.updated_at)}</Text>
              </Box>
            )}
          </Box>
        </a>
      </Link>
    </div>
  );
};
