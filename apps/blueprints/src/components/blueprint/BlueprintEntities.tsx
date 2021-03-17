import { Box, Image } from "@chakra-ui/react";
import { BlueprintStringData } from "@factorio-sites/types";
import styled from "@emotion/styled";

const StyledBox = styled(Box)`
  td {
    border: 1px solid #909090;
  }
  td:not(.no-padding) {
    padding: 5px 10px;
  }
`;

interface BlueprintEntitiesProps {
  data: BlueprintStringData;
}

export const BlueprintEntities: React.FC<BlueprintEntitiesProps> = ({ data }) => {
  return (
    <StyledBox>
      <table>
        <tbody>
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
                <tr key={entry_name}>
                  <td className="no-padding">
                    <Image
                      alt={entry_name.replace(/-/g, " ")}
                      src={`https://factorioprints.com/icons/${entry_name}.png`}
                      fallbackSrc="https://storage.googleapis.com/factorio-blueprints-assets/error-icon.png"
                      width="32px"
                      height="32px"
                    />
                  </td>
                  <td>{entry_name}</td>
                  <td>{entry}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </StyledBox>
  );
};
