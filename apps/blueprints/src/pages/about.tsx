import React from "react";
import { NextPage } from "next";
import { SimpleGrid, Box, Text, Image } from "@chakra-ui/react";
import { Panel } from "../components/Panel";

export const Index: NextPage = () => {
  return (
    <div css={{ margin: "0.7rem" }}>
      <SimpleGrid columns={1} margin="0 auto" maxWidth="800px">
        <Panel title="About">
          <Box>
            <h2 css={{ fontSize: "30px" }}>Factorio Blueprints by Barry</h2>
          </Box>
          <Box>
            <h3 css={{ fontSize: "30px" }}>Contact</h3>
          </Box>
          <Box
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "200px",
            }}
          >
            <Box>
              <Image
                src="https://discord.com/assets/e4923594e694a21542a489471ecffa50.svg"
                height="35px"
              />
            </Box>
            <Box>
              <Text>Barry#7827</Text>
            </Box>
          </Box>
          <Box css={{ marginTop: "1rem" }}>
            <a href="https://github.com/barthuijgen">
              <Image
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
                css={{ height: "25px", display: "inline" }}
              />
            </a>
          </Box>
          <Box css={{ marginTop: "2rem" }}>
            <h3 css={{ fontSize: "25px" }}>Credits</h3>
          </Box>
          <Box>
            <Text>
              Factorio Blueprints uses the work of Teoxoy with the{" "}
              <a
                href="https://github.com/Teoxoy/factorio-blueprint-editor"
                css={{ textDecoration: "underline" }}
              >
                Factorio Blueprints Editor
              </a>{" "}
              to render it's images
            </Text>
          </Box>
          <Box css={{ marginTop: "2rem" }}>
            <h3 css={{ fontSize: "25px" }}>ToDo</h3>
          </Box>
          <Box>
            <ul css={{ paddingLeft: "25px" }}>
              <li css={{ textDecoration: "line-through" }}>Add creating new blueprints</li>
              <li css={{ textDecoration: "line-through" }}>Add search</li>
              <li>Add a landing page on steam sign up to change username before submitting</li>
              <li>Add book preview when creating blueprints</li>
              <li>Add blueprint tags</li>
              <li>Expand search on tags</li>
              <li>Add tracking of blueprint views</li>
              <li>Add favorites</li>
              <li>Add sorting by views/favorites</li>
              <li>Add thumbnails</li>
              <li>Add tag fixing moderators</li>
              <li>Improve modded blueprint support</li>
              <li>Add blueprint title icon support</li>
              <li>Add blueprint history</li>
            </ul>
          </Box>
        </Panel>
      </SimpleGrid>
    </div>
  );
};

export default Index;
