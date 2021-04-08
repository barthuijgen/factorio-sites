import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SimpleGrid,
  Box,
  Text,
} from "@chakra-ui/react";
import { Formik, Field, FieldProps } from "formik";
import { css } from "@emotion/react";
import { chakraResponsive } from "@factorio-sites/web-utils";
import { TAGS } from "@factorio-sites/common-utils";
import { Panel } from "../../components/Panel";
import { validateCreateBlueprintForm } from "../../utils/validate";
import { ImageEditor } from "../../components/ImageEditor";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { MDEditor } from "../../components/MDEditor";
import { pageHandler } from "../../utils/page-handler";

const FieldStyle = css`
  margin-bottom: 1rem;
`;

export const UserBlueprintCreate: NextPage = () => {
  const router = useRouter();

  const tagsOptions = TAGS.map((tag) => ({
    label: `${tag.category}: ${tag.label}`,
    value: tag.value,
  }));

  return (
    <Formik
      initialValues={{ title: "", description: "", string: "", tags: [] }}
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
      {({ isSubmitting, handleSubmit, status, values, errors, setFieldValue }) => (
        <SimpleGrid
          columns={2}
          gap={6}
          templateColumns={chakraResponsive({ mobile: "1fr", desktop: "1fr 1fr" })}
        >
          <Panel title="Create new blueprint">
            <form onSubmit={handleSubmit}>
              <Field name="title">
                {({ field, meta }: FieldProps) => (
                  <FormControl
                    id="title"
                    isRequired
                    isInvalid={meta.touched && !!meta.error}
                    css={FieldStyle}
                  >
                    <FormLabel>Title</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="description">
                {({ field, meta }: FieldProps) => (
                  <FormControl
                    id="description"
                    isRequired
                    isInvalid={meta.touched && !!meta.error}
                    css={FieldStyle}
                  >
                    <FormLabel>Description</FormLabel>
                    <MDEditor
                      value={field.value}
                      onChange={(value) => setFieldValue("description", value)}
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="tags">
                {({ field, meta }: FieldProps) => (
                  <FormControl id="tags" isInvalid={meta.touched && !!meta.error} css={FieldStyle}>
                    <FormLabel>Tags</FormLabel>
                    <Select
                      options={tagsOptions}
                      value={field.value}
                      onChange={(tags) => setFieldValue("tags", tags)}
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="string">
                {({ field, meta }: FieldProps) => (
                  <FormControl
                    id="string"
                    isRequired
                    isInvalid={meta.touched && !!meta.error}
                    css={FieldStyle}
                  >
                    <FormLabel>Blueprint string</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Box css={{ display: "flex", alignItems: "center" }}>
                <Button primary type="submit" disabled={isSubmitting}>
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
  );
};

export const getServerSideProps = pageHandler(async (_, { session, redirect }) => {
  if (!session) return redirect("/");
});

export default UserBlueprintCreate;
