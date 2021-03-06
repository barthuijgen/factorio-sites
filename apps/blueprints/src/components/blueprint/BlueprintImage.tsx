import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useWindowWidth } from "../../hooks/window.hooks";
import { FullscreenImage } from "../FullscreenImage";
import { ImageEditor } from "../ImageEditor";

export type RENDERERS = "fbe" | "fbsr";

interface BlueprintImageProps {
  string: string;
  blueprint_hash: string;
  label: string;
  onSetRenderer?: (renderer: RENDERERS) => void;
}

export const BlueprintImage: React.FC<BlueprintImageProps> = ({
  string,
  blueprint_hash,
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
  ) : (
    <FullscreenImage
      src={`https://fbsr.factorio.workers.dev/${blueprint_hash}?size=1000`}
      alt={label}
    />
  );
};
