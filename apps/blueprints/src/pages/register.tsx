import React from "react";
import { NextPage } from "next";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  SimpleGrid,
  Button,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { Panel } from "../components/Panel";
import { css } from "@emotion/react";
import { validateRegisterForm } from "../utils/validate";
import Link from "next/link";
import { useAuth } from "../providers/auth";
import { useRouter } from "next/router";

const FieldStyle = css`
  margin-bottom: 1rem;
`;

export const Register: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();

  if (auth) {
    router.push("/");
  }

  return (
    <div css={{ margin: "0.7rem" }}>
      <SimpleGrid columns={1} margin="0 auto" maxWidth="600px">
        <Panel title="Register">
          <Formik
            initialValues={{ email: "", username: "", password: "", password_confirm: "" }}
            validate={validateRegisterForm}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              const result = await fetch("/api/register", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(values),
              }).then((res) => res.json());

              if (result.errors) {
                setSubmitting(false);
                setErrors(result.errors);
              } else if (result.success) {
                router.push("/");
              }
            }}
          >
            {({ isSubmitting, handleSubmit, errors }) => (
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
                      <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="username">
                  {({ field, meta }: any) => (
                    <FormControl
                      id="username"
                      isRequired
                      isInvalid={meta.touched && meta.error}
                      css={FieldStyle}
                    >
                      <FormLabel>Username</FormLabel>
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

                <Field name="password_confirm">
                  {({ field, meta }: any) => (
                    <FormControl
                      id="password_confirm"
                      isRequired
                      isInvalid={meta.touched && meta.error}
                      css={FieldStyle}
                    >
                      <FormLabel>Repeat Password</FormLabel>
                      <Input type="password" {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Box>
                  <Button type="submit" colorScheme="green" disabled={isSubmitting}>
                    Register
                  </Button>

                  <div css={{ float: "right", display: "flex", alignItems: "center" }}>
                    <Text css={{ marginRight: "1rem" }}>Already have an account?</Text>
                    <Link href="/login">
                      <a>
                        <Button
                          type="submit"
                          colorScheme="grey"
                          variant="outline"
                          disabled={isSubmitting}
                        >
                          Login
                        </Button>
                      </a>
                    </Link>
                  </div>
                </Box>
              </form>
            )}
          </Formik>
        </Panel>
        <Panel title="Or register with" marginTop="1rem">
          <Box>
            <Link href="/api/openid/steam">
              <a>
                <Image src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_large_noborder.png" />
              </a>
            </Link>
          </Box>
        </Panel>
      </SimpleGrid>
    </div>
  );
};

export default Register;
