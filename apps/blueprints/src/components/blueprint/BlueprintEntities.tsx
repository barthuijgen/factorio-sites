import { Box, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { BlueprintStringData } from "@factorio-sites/types";
import { PanelInset } from "../PanelInset";

const StyledBox = styled(Box)`
  .entities {
    display: inline-block;
  }
`;

const StyledEntity = styled.span`
  background: #313131;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  padding: 5px;
  box-shadow: inset 8px 0 4px -8px #000, inset -8px 0 4px -8px #000, inset 0 10px 2px -8px #282828,
    inset 0 -9px 2px -8px #000, 0 0 4px 0 #000;
  position: relative;

  &:hover {
    box-shadow: inset 8px 0 4px -8px #000, inset -8px 0 4px -8px #000, inset 0 9px 2px -8px #fff,
      inset 0 8px 4px -8px #000, inset 0 -8px 4px -8px #000, inset 0 -9px 2px -8px #432400,
      0 0 4px 0 #000, inset 0 0 4px 2px #f9b44b;
    background-color: #e39827;
    filter: drop-shadow(0 0 2px #f9b44b);
  }

  .entity-total {
    pointer-events: none;
    font-weight: 600;
    position: absolute;
    right: 3px;
    bottom: 0;
    text-shadow: 1px 1px 2px #282828;
  }
`;

interface BlueprintEntitiesProps {
  data: BlueprintStringData;
}

export const BlueprintEntities: React.FC<BlueprintEntitiesProps> = ({ data }) => {
  return (
    <StyledBox>
      <PanelInset className="entities">
        {data?.blueprint?.entities &&
          Object.entries(
            data.blueprint.entities.reduce<Record<string, number>>((entities, entity) => {
              if (entities[entity.name]) {
                entities[entity.name]++;
              } else {
                entities[entity.name] = 1;
              }
              return entities;
            }, {})
          )
            .sort((a, b) => b[1] - a[1])
            .map(([entry_name, entry]) => (
              <StyledEntity key={entry_name} className="entity" title={entry_name}>
                <Image
                  alt={entry_name.replace(/-/g, " ")}
                  src={`https://factorioprints.com/icons/${entry_name}.png`}
                  fallbackSrc="https://storage.googleapis.com/factorio-blueprints-assets/error-icon.png"
                  width="32px"
                  height="32px"
                />
                <span className="entity-total">{entry}</span>
              </StyledEntity>
            ))}
      </PanelInset>
    </StyledBox>
  );
};
