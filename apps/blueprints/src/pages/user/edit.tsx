import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SimpleGrid,
  Radio,
  Stack,
  RadioGroup,
} from "@chakra-ui/react";
import { Formik, Field, FieldProps } from "formik";
import { addYears } from "date-fns";
import { css } from "@emotion/react";
import { useCookies } from "react-cookie";
import { Panel } from "../../components/Panel";
import { Button } from "../../components/Button";
import { validateUserForm } from "../../utils/validate";
import { useAuth } from "../../providers/auth";
import { pageHandler } from "../../utils/page-handler";
import { Tooltip } from "../../components/Tooltip";

const FieldStyle = css`
  margin-bottom: 1rem;
`;

export const UserEdit: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["renderer"]);

  return (
    <SimpleGrid columns={1} margin="0 auto" width="600px">
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

              <Field name="renderer">
                {({ field, meta }: FieldProps) => (
                  <FormControl
                    id="renderer"
                    // isRequired={!auth?.steam_id}
                    isInvalid={meta.touched && !!meta.error}
                    css={FieldStyle}
                  >
                    <FormLabel>
                      Image renderer{" "}
                      <Tooltip
                        text={`FBE is an interactive blueprint viewer, but it doesn't support mobile devices.\nFBSR is based on the factorio blueprint bot, it generates static images of blueprints`}
                      />
                    </FormLabel>
                    <RadioGroup
                      onChange={(value: string) =>
                        setCookie("renderer", value, {
                          path: "/",
                          expires: addYears(new Date(), 1),
                          sameSite: "strict",
                          secure: process.env.NODE_ENV === "production",
                        })
                      }
                      value={cookies.renderer || "fbe"}
                    >
                      <Stack>
                        <Radio value="fbe">FBE</Radio>
                        <Radio value="fbsr">FBSR</Radio>
                      </Stack>
                    </RadioGroup>
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
  );
};

export const getServerSideProps = pageHandler(async (_, { session, redirect }) => {
  if (!session) return redirect("/");
});

export default UserEdit;
