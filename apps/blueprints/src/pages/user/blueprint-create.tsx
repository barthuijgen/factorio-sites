import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SimpleGrid,
  Button,
  Box,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { css } from "@emotion/react";
import { Panel } from "../../components/Panel";
import { validateCreateBlueprintForm } from "../../utils/validate";
import { useAuth } from "../../providers/auth";
import { ImageEditor } from "../../components/ImageEditor";
import { chakraResponsive } from "@factorio-sites/web-utils";

const FieldStyle = css`
  margin-bottom: 1rem;
`;

export const UserBlueprintCreate: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();

  if (!auth) {
    router.push("/");
  }

  return (
    <div css={{ margin: "0.7rem" }}>
      <Formik
        initialValues={{ title: "", description: "", string: "" }}
        validate={validateCreateBlueprintForm}
        onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
          setStatus("");

          const result = await fetch("/api/blueprint/create", {
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
            router.push(`/blueprint/${result.id}`);
          }
        }}
      >
        {({ isSubmitting, handleSubmit, status, values, errors }) => (
          <SimpleGrid
            columns={2}
            gap={6}
            templateColumns={chakraResponsive({ mobile: "1fr", desktop: "1fr 1fr" })}
          >
            <Panel title="Create new blueprint">
              <form onSubmit={handleSubmit}>
                <Field name="title">
                  {({ field, meta }: any) => (
                    <FormControl
                      id="title"
                      isRequired
                      isInvalid={meta.touched && meta.error}
                      css={FieldStyle}
                    >
                      <FormLabel>Title</FormLabel>
                      <Input type="text" {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="description">
                  {({ field, meta }: any) => (
                    <FormControl
                      id="description"
                      isRequired
                      isInvalid={meta.touched && meta.error}
                      css={FieldStyle}
                    >
                      <FormLabel>Description</FormLabel>
                      <Textarea {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="tags">
                  {({ field, meta }: any) => (
                    <FormControl
                      id="tags"
                      //   isRequired
                      isInvalid={meta.touched && meta.error}
                      css={FieldStyle}
                    >
                      <FormLabel>Tags (coming soon)</FormLabel>
                      <Input type="text" {...field} disabled />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="string">
                  {({ field, meta }: any) => (
                    <FormControl
                      id="string"
                      isRequired
                      isInvalid={meta.touched && meta.error}
                      css={FieldStyle}
                    >
                      <FormLabel>Blueprint string</FormLabel>
                      <Input type="text" {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Box css={{ display: "flex", alignItems: "center" }}>
                  <Button type="submit" colorScheme="green" disabled={isSubmitting}>
                    Submit
                  </Button>
                  {status && <Text css={{ marginLeft: "1rem", color: "red" }}>{status}</Text>}
                </Box>
              </form>
            </Panel>
            <Panel title="Preview">
              <Box>
                {values.string && !errors.string && (
                  <ImageEditor string={values.string}></ImageEditor>
                )}
              </Box>
            </Panel>
          </SimpleGrid>
        )}
      </Formik>
    </div>
  );
};

export default UserBlueprintCreate;
