import { AppContext, AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import { css, Global } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import NProgress from "nprogress";
import { CookiesProvider } from "react-cookie";
import { getSessionToken } from "@factorio-sites/node-utils";
import { Header } from "../components/Header";
import { AuthContext, AuthContextProps } from "../providers/auth";
import { useFetch } from "../hooks/fetch";
import { CF_WEB_ANALYTICS, PUBLIC_URL } from "../utils/env";
import { addPreserveScrollListeners } from "../utils/nextjs-preserve-scroll";

const globalStyles = css`
  @font-face {
    font-family: titillium web;
    font-style: normal;
    font-weight: 400;
    src: url(${PUBLIC_URL}/fonts/TitilliumWeb-Regular.ttf);
  }
  @font-face {
    font-family: titillium web;
    font-style: normal;
    font-weight: 600;
    src: url(${PUBLIC_URL}/fonts/TitilliumWeb-SemiBold.ttf);
  }
  @font-face {
    font-family: titillium web;
    font-style: normal;
    font-weight: 700;
    src: url(${PUBLIC_URL}/fonts/TitilliumWeb-Bold.ttf);
  }

  html {
    height: 100%;
    font-size: 100%;
  }
  body {
    background-color: #201810;
    background: #201810;
    background-image: url(https://storage.googleapis.com/factorio-blueprints-assets/site-background.jpg),
      url(data:image/jpeg;base64,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);
    background-size: 2048px 3072px;
    background-position: center top;
    font-family: titillium web, sans-serif;
  }
  main {
    display: flex;
    padding: 1rem;
    .container {
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }
  }
  .global-notice {
    margin: 0.5rem 1rem;
    color: #fff;
    display: flex;
    justify-content: center;
    padding: 0;
  }
`;

if (typeof window !== "undefined") {
  NProgress.configure({
    showSpinner: false,
    speed: 800,
    trickleSpeed: 150,
    template:
      '<div class="bar" role="bar" style="background: #00a1ff;position: fixed;z-index: 5;top: 0;left: 0;width: 100%;height: 4px;" />',
  });
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  addPreserveScrollListeners();
}

const BlueprintsApp = ({
  Component,
  pageProps,
  authenticated,
}: AppProps & { authenticated: boolean }) => {
  const auth = useFetch<{ auth: AuthContextProps }>("/api/user", { skip: !authenticated });

  return (
    <ChakraProvider>
      <CookiesProvider>
        <AuthContext.Provider value={auth.data?.auth || null}>
          <Global styles={globalStyles} />
          <Head>
            <title>Factorio Blueprints</title>
            <link rel="shortcut icon" href={`${PUBLIC_URL}/favicon.png`} />
            <meta name="description" content="Find blueprints for Factorio with advanced search" />
            {CF_WEB_ANALYTICS && (
              <script
                defer
                src="https://static.cloudflareinsights.com/beacon.min.js"
                data-cf-beacon={`{"token": "${CF_WEB_ANALYTICS}"}`}
              ></script>
            )}
          </Head>
          {!auth.loading && (
            <>
              <Header />
              <div className="global-notice">
                Site is being updated for factorio 2.0 and Space Age.
              </div>
              <main>
                <div className="container">
                  <Component {...pageProps} />
                </div>
              </main>
            </>
          )}
        </AuthContext.Provider>
      </CookiesProvider>
    </ChakraProvider>
  );
};

BlueprintsApp.getInitialProps = ({ ctx }: AppContext) => {
  // if (ctx.req?.headers?.host === "factorioblueprints.tech" && ctx.res) {
  //   ctx.res.statusCode = 302;
  //   ctx.res.setHeader("Location", "https://factorio.tools" + ctx.req?.url);
  // }

  const userToken = getSessionToken(ctx.req);
  return { authenticated: !!userToken };
};

export default BlueprintsApp;
