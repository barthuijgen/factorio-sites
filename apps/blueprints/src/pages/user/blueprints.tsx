import React, { useState } from "react";
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

export const UserBlueprints: NextPage<UserBlueprintsProps> = ({ blueprints: blueprintsProp }) => {
  const [blueprints, setBlueprints] = useState<BlueprintPage[]>(blueprintsProp);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  if (!blueprints) return null;

  const deleteBlueprint = async (id: string) => {
    setDeleteId(id);
    try {
      await fetch(`/api/blueprint/delete/${id}`, { method: "DELETE" });
      setBlueprints((blueprints) => blueprints.filter((bp) => bp.id !== id));
    } catch (err) {
      console.error(err);
    }
    setDeleteId(null);
  };

  return (
    <SimpleGrid columns={1} margin="0 auto" maxWidth="800px">
      <Panel title="Blueprints">
        <Link href="/user/blueprint-create">
          <a>
            <Button primary>Create Blueprint</Button>
          </a>
        </Link>
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
              <BlueprintLink
                key={bp.id}
                blueprint={bp}
                editLink
                type="row"
                onDelete={deleteBlueprint}
                disableDelete={deleteId === bp.id}
              />
            ))
          ) : (
            <p css={{ marginTop: "10px" }}>You don't have any blueprints yet</p>
          )}
        </Box>
      </Panel>
    </SimpleGrid>
  );
};

export const getServerSideProps = pageHandler(async (_, { session, redirect }) => {
  if (!session) return redirect("/");

  const blueprints = await getBlueprintPageByUserId(session.user.id);

  return { props: { blueprints } };
});

export default UserBlueprints;
