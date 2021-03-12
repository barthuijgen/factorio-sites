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
} from "@chakra-ui/react";
import { Formik, Field, FieldProps } from "formik";
import { Panel } from "../components/Panel";
import { css } from "@emotion/react";
import { validateRegisterForm } from "../utils/validate";
import Link from "next/link";
import { useRouter } from "next/router";
import { pageHandler } from "../utils/page-handler";
import { SteamLogin } from "../components/SteamLogin";

const FieldStyle = css`
  margin-bottom: 1rem;
`;

export const Register: NextPage = () => {
  const router = useRouter();

  return (
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
                {({ field, meta }: FieldProps) => (
                  <FormControl
                    id="email"
                    isRequired
                    isInvalid={meta.touched && !!meta.error}
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
                {({ field, meta }: FieldProps) => (
                  <FormControl
                    id="username"
                    isRequired
                    isInvalid={meta.touched && !!meta.error}
                    css={FieldStyle}
                  >
                    <FormLabel>Username</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, meta }: FieldProps) => (
                  <FormControl
                    id="password"
                    isRequired
                    isInvalid={meta.touched && !!meta.error}
                    css={FieldStyle}
                  >
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...field} />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password_confirm">
                {({ field, meta }: FieldProps) => (
                  <FormControl
                    id="password_confirm"
                    isRequired
                    isInvalid={meta.touched && !!meta.error}
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
          <SteamLogin />
        </Box>
      </Panel>
    </SimpleGrid>
  );
};

export const getServerSideProps = pageHandler(async (_, { session, redirect }) => {
  if (session) return redirect("/");
});

export default Register;
