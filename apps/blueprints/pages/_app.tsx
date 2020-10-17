/** @jsx jsx */
import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { jsx, css } from "@emotion/core";
import { normalize } from "./normalize";
import { Global } from "@emotion/core";

const mainStyles = css`
  font-family: sans-serif;

  header {
    display: flex;
    align-items: center;
    justify-content: left;
    background-color: #143055;
    color: white;
    padding: 5px 20px;

    h1 {
      margin: 10px 0;
    }
  }

  main {
    padding: 0 20px;
  }

  .sidebar {
    background: #ccc;
  }
`;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Global styles={normalize} />
      <Head>
        <title>Welcome to blueprints!</title>
      </Head>
      <div css={mainStyles}>
        <header>
          <h1>Factorio Blueprints</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
};

export default CustomApp;
