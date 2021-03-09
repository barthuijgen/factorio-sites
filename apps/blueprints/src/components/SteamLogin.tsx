import Link from "next/link";
import { Image } from "@chakra-ui/react";

export const SteamLogin: React.FC = () => {
  return (
    <Link href={`/api/openid/steam`}>
      <a>
        <Image src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_large_noborder.png" />
      </a>
    </Link>
  );
};
