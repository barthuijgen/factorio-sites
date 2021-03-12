import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { getBlueprintPageByUserId } from "@factorio-sites/database";
import { BlueprintPage } from "@factorio-sites/types";
import { pageHandler } from "../../utils/page-handler";
import { BlueprintLink } from "../../components/BlueprintLink";
import { Panel } from "../../components/Panel";
import { Button } from "../../components/Button";
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
                <Button primary>Create Blueprint</Button>
              </a>
            </Link>
          </Box>
          <Box>
            {blueprints.length !== 0 ? (
              blueprints.map((bp) => (
                <BlueprintLink key={bp.id} blueprint={bp} editLink type="row" />
              ))
            ) : (
              <p css={{ marginTop: 10 }}>No results found</p>
            )}
          </Box>
        </Panel>
      </SimpleGrid>
    </div>
  );
};

export const getServerSideProps = pageHandler(async (_, { session, redirect }) => {
  if (!session) return redirect("/");

  const blueprints = await getBlueprintPageByUserId(session.user.id);

  return { props: { blueprints } };
});

export default UserBlueprints;
