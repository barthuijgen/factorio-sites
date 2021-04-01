import { parseFactorioGameVersion } from "@factorio-sites/web-utils";
import { useEffect, useState } from "react";

export function useFactorioGameVersion(game_version?: string | number | null) {
  const [version, setVersion] = useState("");

  useEffect(() => {
    (async () => {
      if (game_version) {
        const result = await parseFactorioGameVersion(game_version);
        setVersion(result);
      }
    })();
  }, [game_version]);

  return version;
}
