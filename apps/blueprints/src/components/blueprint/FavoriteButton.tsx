import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAuth } from "../../providers/auth";
import { Button } from "../Button";

interface FavoriteButtonProps {
  is_favorite: boolean;
  blueprint_page_id: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  is_favorite: isFavoriteDefault,
  blueprint_page_id,
}) => {
  const auth = useAuth();
  const [isFavorite, setIsFavorite] = useState(isFavoriteDefault);

  const onClickFavorite = async () => {
    const result = await fetch("/api/user/favorite", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ blueprint_page_id }),
    }).then((res) => res.json());
    setIsFavorite(result.favorite);
  };

  if (!auth) return null;

  return (
    <Button
      onClick={onClickFavorite}
      css={{ display: "inline-flex", float: "right", fontSize: "initial" }}
    >
      Favorite
      <span className="icon" css={{ marginLeft: "5px" }}>
        {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
      </span>
    </Button>
  );
};
