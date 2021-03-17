import { Box } from "@chakra-ui/react";
import { BlueprintPage } from "@factorio-sites/types";
import styled from "@emotion/styled";
import { TAGS_BY_KEY } from "@factorio-sites/common-utils";
import { useRouter } from "next/router";
import { useRouterQueryToHref } from "../../hooks/query.hook";

const StyledBox = styled(Box)`
  text-align: left;

  .tag {
    display: inline-block;
    margin: 3px;
    padding: 0 3px;
    background: #313131;
    border-radius: 3px;
  }

  .tag:hover {
    cursor: pointer;
  }
`;

interface BlueprintTagsProps {
  blueprint_page: BlueprintPage;
}

export const BlueprintTags: React.FC<BlueprintTagsProps> = ({ blueprint_page }) => {
  const router = useRouter();
  const routerQueryToHref = useRouterQueryToHref();

  return (
    <StyledBox>
      {blueprint_page.tags.length ? (
        blueprint_page.tags.map((tag) => (
          <span
            key={tag}
            className="tag"
            onClick={() => router.push(routerQueryToHref({ tags: [tag] }, true))}
          >
            {TAGS_BY_KEY[tag].category}: {TAGS_BY_KEY[tag].label}
          </span>
        ))
      ) : (
        <div>No tags have been added yet</div>
      )}
    </StyledBox>
  );
};
