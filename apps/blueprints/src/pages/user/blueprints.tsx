import React from "react";
import { NextPage } from "next";
import { Button, SimpleGrid, Box } from "@chakra-ui/react";
import { Panel } from "../../components/Panel";
import Link from "next/link";

export const UserBlueprints: NextPage = () => {
  return (
    <div css={{ margin: "0.7rem" }}>
      <SimpleGrid columns={1} margin="0 auto" maxWidth="800px">
        <Panel title="Blueprints">
          <Box>user blueprints</Box>
          <Link href="/user/blueprint-create">
            <a>
              <Button colorScheme="green">create blueprint</Button>
            </a>
          </Link>
        </Panel>
      </SimpleGrid>
    </div>
  );
};

export default UserBlueprints;
