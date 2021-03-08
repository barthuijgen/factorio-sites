import { IconSignalTypes } from "@factorio-sites/types";

interface FactorioIconProps {
  type: IconSignalTypes;
  icon: string;
  size: number;
}

function getUrlByType(type: FactorioIconProps["type"], icon: string) {
  switch (type) {
    case "item":
      return `https://storage.googleapis.com/factorio-blueprints-assets/factorio/graphics/icons/${icon}.png`;
    case "fluid":
      return `https://storage.googleapis.com/factorio-blueprints-assets/factorio/graphics/icons/fluid/${icon}.png`;
    case "virtual":
      return null;
    default:
      console.log("icon type not found", type, icon);
      return null;
  }
}

const ICON_RENAMES: Record<string, string> = {
  "stone-wall": "wall",
  "heat-exchanger": "heat-boiler",
};

export const FactorioIcon: React.FC<FactorioIconProps> = ({ type, icon, size }) => {
  if (ICON_RENAMES[icon]) icon = ICON_RENAMES[icon];
  const url = getUrlByType(type, icon);
  if (!url) return null;
  return (
    <div
      css={{
        display: "inline-block",
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url('${url}')`,
        backgroundSize: `${Math.round((120 / 64) * size)}px`,
      }}
    />
  );
};
