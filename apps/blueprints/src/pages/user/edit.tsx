import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormControl, FormLabel, FormErrorMessage, Input, SimpleGrid } from "@chakra-ui/react";
import { Formik, Field, FieldProps } from "formik";
import { css } from "@emotion/react";
import { Panel } from "../../components/Panel";
import { Button } from "../../components/Button";
import { validateUserForm } from "../../utils/validate";
import { useAuth } from "../../providers/auth";
import { pageHandler } from "../../utils/page-handler";

const FieldStyle = css`
  margin-bottom: 1rem;
`;

export const UserEdit: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <div css={{ margin: "0.7rem" }}>
      <SimpleGrid columns={1} margin="0 auto" maxWidth="600px">
        <Panel title="Account settings">
          <Formik
            initialValues={{ username: auth?.username ?? "", email: auth?.email ?? "" }}
            validate={validateUserForm(auth)}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              const result = await fetch("/api/user/edit", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(values),
              }).then((res) => res.json());

              if (result.errors) {
                setSubmitting(false);
                setErrors(result.errors);
              } else {
                // Update user session data
                router.reload();
              }
            }}
          >
            {({ isSubmitting, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name="email">
                  {({ field, meta }: FieldProps) => (
                    <FormControl
                      id="email"
                      isRequired={!auth?.steam_id}
                      isInvalid={meta.touched && !!meta.error}
                      css={FieldStyle}
                    >
                      <FormLabel>Email address</FormLabel>
                      <Input type="text" {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
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

                <Button
                  primary
                  css={{ width: 80, textAlign: "center" }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </form>
            )}
          </Formik>
        </Panel>
      </SimpleGrid>
    </div>
  );
};

export const getServerSideProps = pageHandler(async (_, { session, redirect }) => {
  if (!session) return redirect("/");
});

export default UserEdit;
