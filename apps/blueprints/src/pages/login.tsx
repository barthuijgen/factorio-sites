import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SimpleGrid,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { Panel } from "../components/Panel";
import { css } from "@emotion/react";
import { validateLoginForm } from "../utils/validate";
import { useRouter } from "next/router";
import { SteamLogin } from "../components/SteamLogin";
import { pageHandler } from "../utils/page-handler";

const FieldStyle = css`
  margin-bottom: 1rem;
`;

export const Login: NextPage = () => {
  const router = useRouter();

  return (
    <div css={{ margin: "0.7rem" }}>
      <SimpleGrid columns={1} margin="0 auto" maxWidth="600px">
        <Panel title="Login">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={validateLoginForm}
            onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
              setStatus("");

              const result = await fetch("/api/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(values),
              }).then((res) => res.json());

              if (result.status) {
                setSubmitting(false);
                setStatus(result.status);
              } else if (result.errors) {
                setSubmitting(false);
                setErrors(result.errors);
              } else if (result.success) {
                router.push("/");
              }
            }}
          >
            {({ isSubmitting, handleSubmit, status }) => (
              <form onSubmit={handleSubmit}>
                <Field name="email">
                  {({ field, meta }: any) => (
                    <FormControl
                      id="email"
                      isRequired
                      isInvalid={meta.touched && meta.error}
                      css={FieldStyle}
                    >
                      <FormLabel>Email address</FormLabel>
                      <Input type="text" {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, meta }: any) => (
                    <FormControl
                      id="password"
                      isRequired
                      isInvalid={meta.touched && meta.error}
                      css={FieldStyle}
                    >
                      <FormLabel>Password</FormLabel>
                      <Input type="password" {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Box>
                  <Box css={{ display: "flex", alignItems: "center" }}>
                    <Button type="submit" colorScheme="green" disabled={isSubmitting}>
                      Login
                    </Button>
                    {status && <Text css={{ marginLeft: "1rem", color: "red" }}>{status}</Text>}
                  </Box>

                  <div css={{ float: "right", display: "flex", alignItems: "center" }}>
                    <Text css={{ marginRight: "1rem" }}>Make an account instead?</Text>
                    <Link href="/register">
                      <a>
                        <Button
                          type="submit"
                          colorScheme="grey"
                          variant="outline"
                          disabled={isSubmitting}
                        >
                          Register
                        </Button>
                      </a>
                    </Link>
                  </div>
                </Box>
              </form>
            )}
          </Formik>
        </Panel>
        <Panel title="Or login with" marginTop="1rem">
          <Box>
            <SteamLogin />
          </Box>
        </Panel>
      </SimpleGrid>
    </div>
  );
};

export const getServerSideProps = pageHandler(async (_, { session, redirect }) => {
  if (session) return redirect("/");
});

export default Login;
