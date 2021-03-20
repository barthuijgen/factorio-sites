import { Box } from "@chakra-ui/layout";
import styled from "@emotion/styled";
import { IconSignalTypes } from "@factorio-sites/types";
import { ReactNode } from "react";
import { FactorioIcon } from "./FactorioIcon";

const ICON_TYPES = ["entity", "item", "recipe", "fluid", "virtual-signal", "img"];

const ICON_REGEX = new RegExp(
  `(\\[(?<type>${ICON_TYPES.join(
    "|"
  )})=(?<icon>.*?)\\]|\\[color=(?<color>.*?)\\](?<content>.*?)\\[\\/color\\])`,
  "g"
);

const RBG_COLOR_REGEX = /^\d+,\d+,\d+$/;
const IMG_ICON_REGEX = /^\[img=(.*?)\/(.*?)\]$/;

interface Match {
  value: string;
  start: number;
  end: number;
  groups: Record<string, string | undefined>;
}

const regexMatchAll = (string: string, regexp: RegExp): Match[] => {
  const matches = [];
  let match;
  while ((match = ICON_REGEX.exec(string)) !== null) {
    matches.push({
      value: match[0],
      start: match.index,
      end: ICON_REGEX.lastIndex,
      groups: match.groups || {},
    });
  }
  return matches;
};

const parseFactorioCode = (string: string): ReactNode => {
  const iconMatches = regexMatchAll(string, ICON_REGEX);

  if (!iconMatches.length) return string;

  const result = [] as ReactNode[];
  let lastHandledIndex = 0;

  iconMatches.forEach((match) => {
    if (match.start > lastHandledIndex) {
      let content = string.substr(lastHandledIndex, match.start - lastHandledIndex);
      content = content.replace(/ /g, "\u00A0");
      result.push(<span key={lastHandledIndex}>{content}</span>);
    }

    if (match.groups.color && match.groups.content) {
      if (match.groups.color.match(RBG_COLOR_REGEX)) {
        match.groups.color = `rgb(${match.groups.color})`;
      }
      result.push(
        <span
          key={match.start}
          css={{ color: match.groups.color, display: "inline-flex", alignItems: "center" }}
        >
          {parseFactorioCode(match.groups.content)}
        </span>
      );
    } else if (match.groups.type && match.groups.icon) {
      if (match.groups.type === "img") {
        const [, type, icon] = match.value.match(IMG_ICON_REGEX) || [];
        if (type && icon) {
          match.groups.type = type;
          match.groups.icon = icon;
        }
      }
      result.push(
        <FactorioIcon
          key={match.start}
          type={match.groups.type as IconSignalTypes}
          icon={match.groups.icon as string}
          size={20}
        />
      );
    } else {
      console.warn("[FactorioCode] Match without proper capture groups", match);
    }

    lastHandledIndex = match.end;
  });

  if (lastHandledIndex < string.length) {
    result.push(<span key={lastHandledIndex}>{string.substr(lastHandledIndex)}</span>);
  }

  return result;
};

const StyledBox = styled(Box)`
  display: inline-flex;
  align-items: center;
`;

export const FactorioCode: React.FC<{ code: string; className?: string }> = ({
  code,
  className,
}) => {
  return <StyledBox className={className}>{parseFactorioCode(code)}</StyledBox>;
};
