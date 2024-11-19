import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useWindowWidth } from "../../hooks/window.hooks";
import { FullscreenImage } from "../FullscreenImage";
import { ImageEditor } from "../ImageEditor";

export type RENDERERS = "fbe" | "fbsr";

interface BlueprintImageProps {
  string: string;
  blueprint_hash: string;
  image_hash?: string;
  label: string;
  onSetRenderer?: (renderer: RENDERERS) => void;
}

export const BlueprintImage: React.FC<BlueprintImageProps> = ({
  string,
  blueprint_hash,
  image_hash,
  label,
  onSetRenderer,
}) => {
  const width = useWindowWidth();
  const [cookies] = useCookies();

  const determineRenderer = () => {
    const isFbeRenderer = cookies.renderer !== "fbsr" && width > 760;
    return isFbeRenderer ? "fbe" : "fbsr";
  };

  const [renderer, setRenderer] = useState<RENDERERS>(determineRenderer);

  useEffect(() => {
    setRenderer(determineRenderer());
    if (onSetRenderer) onSetRenderer(determineRenderer());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blueprint_hash]);

  return renderer === "fbe" ? (
    <ImageEditor string={string} onError={() => setRenderer("fbsr")}></ImageEditor>
  ) : image_hash ? (
    <FullscreenImage
      // src={`https://fbsr.factorio.workers.dev/${blueprint_hash}?size=1000`}
      // src={`https://render.factorio.tools/render?url=https://factorioblueprints.tech/api/string/${blueprint_hash}`}
      src={`https://storage.factorio.tools/factorio-blueprint-images/render/${image_hash}.webp`}
      alt={label}
    />
  ) : null;
};
