import { NextPage } from "next";
import { SimpleGrid, Box, Text, Image, Link } from "@chakra-ui/react";
import { Panel } from "../components/Panel";
import { css } from "@emotion/react";
import { PUBLIC_URL } from "../utils/env";

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
        <Box
          css={css(headerCss, {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          })}
        >
          <Box>
            <h2 style={{ fontSize: "30px" }}>Factorio Blueprints by Barry</h2>
          </Box>
        </Box>
        <Box>
          <p>
            Factorio blueprints aims to be a feature complete blueprints library where you can
            upload, organize and search for blueprints. It scans uploaded blueprints and blueprint
            books to break down their contents allowing you to view and copy individual blueprints,
            but also power the search where you can find any type of entity and recipe, even modded
            once.
          </p>
          <p>
            If you have any suggestions or feedback please join our discord below or create an
            github issue and get in touch!
          </p>
        </Box>
        <Box css={headerCss}>
          <h3>Join our discord server</h3>
        </Box>
        <Box>
          <Link href="https://discord.gg/87b92d6vDk" target="__blank" rel="noopener">
            <Image src="./discord_logo.svg" height="35px" />
          </Link>
        </Box>
        <Box css={headerCss}>
          <h3>The project is open source</h3>
        </Box>
        <Box>
          <Link
            href="https://github.com/barthuijgen/factorio-sites"
            target="__blank"
            rel="noopener"
          >
            <Image src="./github_logo.png" css={{ height: "25px", display: "inline" }} />
          </Link>
        </Box>
        <Box css={headerCss}>
          <h3>Credits</h3>
        </Box>
        <Box>
          <Text>
            Factorio Blueprints uses the work of Teoxoy with the
            <a
              href="https://github.com/Teoxoy/factorio-blueprint-editor"
              style={{
                textDecoration: "underline",
                display: "inline-flex",
                alignItems: "center",
                margin: "0 5px",
                verticalAlign: "bottom",
              }}
            >
              <img
                src={`${PUBLIC_URL}/fbe.svg`}
                alt="Factorio blueprint editor"
                style={{ display: "inline-block", height: "18px" }}
              />
              Factorio Blueprints Editor
            </a>
            to render it's images
          </Text>
          <Text>
            And the{" "}
            <a
              href="https://github.com/demodude4u/Factorio-FBSR"
              style={{ textDecoration: "underline" }}
            >
              FBSR
            </a>{" "}
            created by Demod to render images for mobile view
          </Text>
        </Box>
        <Box css={headerCss}>
          <h3>Roadmap</h3>
        </Box>
        <Box>
          <Link
            href="https://github.com/barthuijgen/factorio-sites/projects/1"
            target="__blank"
            css={{ textDecoration: "underline" }}
          >
            See roadmap on GitHub
          </Link>
        </Box>
        <Box css={headerCss}>
          <h3>Submit your ideas and feedback</h3>
        </Box>
        <Box>
          <Link
            href="https://github.com/barthuijgen/factorio-sites/issues/new"
            target="__blank"
            css={{ textDecoration: "underline" }}
          >
            Create an issue on GitHub
          </Link>
        </Box>
      </Panel>
    </SimpleGrid>
  );
};

export default Index;
