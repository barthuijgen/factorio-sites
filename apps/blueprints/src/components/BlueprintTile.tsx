import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { css } from "@emotion/react";
import { Box, Text } from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";
import { BlueprintPage } from "@factorio-sites/types";
import clsx from "clsx";

const linkStyles = css`
  margin: 5px 10px 5px 0;
  background: #403f40;
  width: 220px;
  height: 255px;
  box-shadow: inset 3px 0 3px -3px #201815, inset 2px 0 2px -2px #201815,
    inset 1px 0 1px -1px #201815, inset 0 3px 3px -3px #8f8c8b, inset 0 2px 2px -2px #8f8c8b,
    inset 0 1px 1px -1px #8f8c8b, inset -3px 0 3px -3px #201815, inset -2px 0 2px -2px #201815,
    inset -2px 0 1px -1px #201815, inset 0 -3px 3px -3px #000, inset 0 -2px 2px -2px #000,
    inset 0 -1px 1px -1px #000, 0 0 2px 0 #201815, 0 0 4px 0 #201815;

  .block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .image {
    position: relative;
    width: 200px;
    height: 200px;
    background: #303030;
    margin: 10px;

    box-shadow: inset 0 0 3px 0 #000, 0 -2px 2px -1px #000, -2px 0 2px -2px #28221f,
      -2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f,
      0 3px 3px -3px #8f8c8b, 0 2px 2px -2px #8f8c8b, 0 1px 1px -1px #8f8c8b;

    & > div {
      margin: 2px 0 !important;
    }
  }

  .details {
    display: flex;
    margin: 0 10px;
    padding: 0 5px;
    background-color: #242324;
    box-shadow: inset 0 0 3px 0 #000, 0 -2px 2px -1px #000, -2px 0 2px -2px #28221f,
      -2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f, 2px 0 2px -2px #28221f,
      0 3px 3px -3px #8f8c8b, 0 2px 2px -2px #8f8c8b, 0 1px 1px -1px #8f8c8b;
  }

  .favorite {
    margin-right: 5px;

    &.user-favorite svg {
      fill: #fe5a5a;
    }

    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }

    &:disabled {
      pointer-events: none;
    }
  }

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  a {
    display: block;
    /* padding: 5px; */
    color: #fff;
  }

  &:hover {
    cursor: pointer;
    background: #4c4c4c;
  }
`;

interface BlueprintTileProps {
  blueprint: Pick<
    BlueprintPage,
    "id" | "title" | "image_hash" | "favorite_count" | "updated_at"
  > & {
    user_favorite: boolean;
  };
  editLink?: boolean;
  disableFavorite?: boolean;
  onFavoriteClick?: (id: string) => void;
}

export const BlueprintTile: React.FC<BlueprintTileProps> = ({
  blueprint,
  editLink,
  disableFavorite,
  onFavoriteClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const onImageError = () => {
    setImageError(true);
  };

  return (
    <div css={linkStyles}>
      <Link
        href={editLink ? `/user/blueprint/${blueprint.id}` : `/blueprint/${blueprint.id}`}
        passHref
      >
        <a>
          <Box className="block">
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
            <Box className="details">
              <Text css={{ display: "flex", alignItems: "center", marginRight: "1rem" }}>
                <button
                  className={clsx("favorite", { "user-favorite": blueprint.user_favorite })}
                  title={blueprint.user_favorite ? "Remove from favorites" : "Add to favorites"}
                  disabled={disableFavorite}
                  onClick={(e) => {
                    e.preventDefault();
                    onFavoriteClick?.(blueprint.id);
                  }}
                >
                  <MdFavorite />
                </button>
                {blueprint.favorite_count || "0"}
              </Text>
              <Text className="title">{blueprint.title}</Text>
            </Box>
          </Box>
        </a>
      </Link>
    </div>
  );
};
