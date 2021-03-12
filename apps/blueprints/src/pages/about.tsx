import React from "react";
import { NextPage } from "next";
import { SimpleGrid, Box, Text, Image } from "@chakra-ui/react";
import { Panel } from "../components/Panel";
import { css } from "@emotion/react";
import { IoIosConstruct } from "react-icons/io";

const listCss = css`
  padding-left: 25px;
  .strike {
    text-decoration: line-through;
  }
`;

const headerCss = css`
  margin-top: 1rem;
  h3 {
    font-size: 23px;
  }
`;

export const Index: NextPage = () => {
  return (
    <SimpleGrid columns={1} margin="0 auto" maxWidth="800px">
      <Panel title="About">
        <Box>
          <h2 css={{ fontSize: "30px" }}>Factorio Blueprints by Barry</h2>
        </Box>
        <Box css={headerCss}>
          <h3 css={{ color: "orange" }}>
            Work in progress! <IoIosConstruct css={{ display: "inline-block" }} />
          </h3>
        </Box>
        <Box css={headerCss}>
          <h3>Contact</h3>
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
        <Box css={headerCss}>
          <h3>Credits</h3>
        </Box>
        <Box>
          <Text>
            Factorio Blueprints uses the work of Teoxoy with the
            <a
              href="https://github.com/Teoxoy/factorio-blueprint-editor"
              css={{
                textDecoration: "underline",
                display: "inline-flex",
                alignItems: "center",
                margin: "0 5px",
                verticalAlign: "bottom",
              }}
            >
              <img
                src="/fbe.svg"
                alt="Factorio blueprint editor"
                css={{ display: "inline-block", height: "18px" }}
              />
              Factorio Blueprints Editor
            </a>
            to render it's images
          </Text>
        </Box>
        <Box css={headerCss}>
          <h3>Roadmap</h3>
        </Box>
        <Box>
          <ul css={listCss}>
            <li>Make a good tags list</li>
            <li>Add a "copy url" button</li>
            <li>Fix "auhor" field in blueprint pages and filter blueprints by user</li>
            <li>Add book preview when creating blueprints</li>
            <li>Improve modded blueprint support in FBE</li>
            <li>Improve blueprint title icon (bbcode) support</li>
            <li>Make entity/recipe/item dropdown be based on blueprint data in the site</li>
            <li>Add a Wysiwyg editor for descriptions</li>
            <li>Change thumbnail generation method to be more reliable</li>
            <li>Add tag fixing moderators role</li>
            <li>Add a landing page on steam sign up to change username before submitting</li>
            <li>Add tracking of blueprint views</li>
            <li>Add blueprint history</li>
            <li className="strike">Add creating new blueprints</li>
            <li className="strike">Add search</li>
            <li className="strike">Add blueprint tags</li>
            <li className="strike">Expand search with tags</li>
            <li className="strike">Add favorites</li>
            <li className="strike">Add sorting by views/favorites</li>
            <li className="strike">Add thumbnails</li>
            <li className="strike">
              Add search filter for blueprint entities/recipes without manual tagging
            </li>
          </ul>
        </Box>
      </Panel>
    </SimpleGrid>
  );
};

export default Index;
