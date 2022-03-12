import { NextPage } from "next";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import { getUserFavoriteBlueprintPages } from "@factorio-sites/database";
import { BlueprintPage } from "@factorio-sites/types";
import { pageHandler } from "../../utils/page-handler";
import { BlueprintLink } from "../../components/BlueprintLink";
import { Panel } from "../../components/Panel";

interface UserBlueprintsProps {
  blueprints: BlueprintPage[];
}

export const UserBlueprints: NextPage<UserBlueprintsProps> = ({ blueprints }) => {
  if (!blueprints) return null;

  return (
    <SimpleGrid columns={1} margin="0 auto" maxWidth="800px">
      <Panel title="Blueprints">
        <Text>Your favorites</Text>
        <hr
          css={{
            border: "none",
            height: "2px",
            margin: "12px auto",
            boxShadow: "inset 0 1px 1px 0 #131313, inset 0 -1px 1px 0 #838383, 0 0 4px 0 #392f2e",
          }}
        />
        <Box>
          {blueprints.length !== 0 ? (
            blueprints.map((bp) => (
              <BlueprintLink key={bp.id} css={{ margin: "5px 0" }} blueprint={bp} />
            ))
          ) : (
            <p css={{ marginTop: "10px" }}>You don't have any favorites yet</p>
          )}
        </Box>
      </Panel>
    </SimpleGrid>
  );
};

export const getServerSideProps = pageHandler(async (_, { session, redirect }) => {
  if (!session) return redirect("/");

  const blueprints = await getUserFavoriteBlueprintPages(session.user.id);

  return { props: { blueprints } };
});

export default UserBlueprints;
