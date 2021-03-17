import { Box } from "@chakra-ui/react";
import { BlueprintPage } from "@factorio-sites/types";
import styled from "@emotion/styled";
import { TAGS_BY_KEY } from "@factorio-sites/common-utils";

const StyledBox = styled(Box)`
  text-align: left;

  .tag {
    display: inline-block;
    margin: 3px;
    padding: 0 3px;
    background: #313131;
    border-radius: 3px;
  }
`;

interface BlueprintTagsProps {
  blueprint_page: BlueprintPage;
}

export const BlueprintTags: React.FC<BlueprintTagsProps> = ({ blueprint_page }) => {
  return (
    <StyledBox>
      {blueprint_page.tags.length ? (
        blueprint_page.tags.map((tag) => (
          <span key={tag} className="tag">
            {TAGS_BY_KEY[tag].category}: {TAGS_BY_KEY[tag].label}
          </span>
        ))
      ) : (
        <div>No tags have been added yet</div>
      )}
    </StyledBox>
  );
};
