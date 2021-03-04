import React from "react";
import { NextPage } from "next";
import { Button, SimpleGrid, Box } from "@chakra-ui/react";
import { Panel } from "../../components/Panel";
import Link from "next/link";
import { pageHandler } from "../../utils/page-handler";
import { BlueprintPage, getBlueprintPageByUserId } from "@factorio-sites/database";
import { BlueprintLink } from "../../components/BlueprintLink";

interface UserBlueprintsProps {
  blueprints: BlueprintPage[];
}

export const UserBlueprints: NextPage<UserBlueprintsProps> = ({ blueprints }) => {
  return (
    <div css={{ margin: "0.7rem" }}>
      <SimpleGrid columns={1} margin="0 auto" maxWidth="800px">
        <Panel title="Blueprints">
          <Box
            css={{
              display: "flex",
              borderBottom: "1px solid #b7b7b7",
              paddingBottom: "0.3rem",
            }}
          >
            <Link href="/user/blueprint-create">
              <a>
                <Button colorScheme="green">create blueprint</Button>
              </a>
            </Link>
          </Box>
          <Box>
            {blueprints.map((bp) => (
              <BlueprintLink key={bp.id} blueprint={bp} editLink />
            ))}
          </Box>
        </Panel>
      </SimpleGrid>
    </div>
  );
};

export const getServerSideProps = pageHandler(async (context, { session }) => {
  if (!session) {
    return { props: {} };
  }

  const blueprints = await getBlueprintPageByUserId(session.user.id);

  return {
    props: {
      blueprints,
    },
  };
});

export default UserBlueprints;
