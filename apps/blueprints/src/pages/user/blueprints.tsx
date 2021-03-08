import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Button, SimpleGrid, Box } from "@chakra-ui/react";
import { getBlueprintPageByUserId } from "@factorio-sites/database";
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
              <BlueprintLink key={bp.id} blueprint={bp} editLink type="row" />
            ))}
          </Box>
        </Panel>
      </SimpleGrid>
    </div>
  );
};

export const getServerSideProps = pageHandler(async (context, { session }) => {
  if (!session) {
    if (context.res) {
      context.res.statusCode = 302;
      context.res.setHeader("Location", "/");
    }
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
