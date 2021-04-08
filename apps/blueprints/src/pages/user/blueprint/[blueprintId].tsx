import React, { useState, useMemo, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Formik, Field, FieldProps, useFormikContext } from "formik";
import { css } from "@emotion/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SimpleGrid,
  Box,
  Text,
} from "@chakra-ui/react";
import { chakraResponsive, parseBlueprintStringClient } from "@factorio-sites/web-utils";
import {
  getBlueprintBookById,
  getBlueprintById,
  getBlueprintPageById,
  getBlueprintStringByHash,
} from "@factorio-sites/database";
import { Blueprint, BlueprintBook, BlueprintPage } from "@factorio-sites/types";
import { TAGS } from "@factorio-sites/common-utils";
import { pageHandler } from "../../../utils/page-handler";
import { Panel } from "../../../components/Panel";
import { validateBlueprintString, validateRequired } from "../../../utils/validate";
import { ImageEditor } from "../../../components/ImageEditor";
import { Select } from "../../../components/Select";
import { Button } from "../../../components/Button";
import { MDEditor } from "../../../components/MDEditor";

const FieldStyle = css`
  margin-bottom: 1rem;
`;

const devider = css({
  marginLeft: "-64px",
  marginRight: "-64px",
  border: "none",
  height: "2px",
  margin: "12px auto",
  boxShadow: "inset 0 1px 1px 0 #131313, inset 0 -1px 1px 0 #838383, 0 0 4px 0 #392f2e",
});

type Selected =
  | { type: "blueprint"; data: Pick<Blueprint, "id" | "blueprint_hash">; string: string }
  | { type: "blueprint_book"; data: Pick<BlueprintBook, "id" | "blueprint_hash">; string: string };

interface FormValues {
  title: string;
  description: string;
  string: string;
  tags: string[];
}

interface UserBlueprintProps {
  blueprintPage: BlueprintPage;
  selected: Selected;
}

const FormContent: React.FC<{ initialString: string }> = ({ initialString }) => {
  const {
    values,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    status,
  } = useFormikContext<FormValues>();
  const [string, setString] = useState(initialString);

  const data = useMemo(() => {
    if (string) {
      const parsed = parseBlueprintStringClient(string);
      console.log("data", parsed);
      return parsed;
    }
    return null;
  }, [string]);

  const blueprintDescription = data?.blueprint?.description || data?.blueprint_book?.description;

  useEffect(() => {
    if (values.string) {
      setString(values.string);
    } else if (string !== initialString) {
      setString(initialString);
    }
  }, [values.string, string, initialString]);

  const tagsOptions = TAGS.map((tag) => ({
    label: `${tag.category}: ${tag.label}`,
    value: tag.value,
  }));

  return (
    <SimpleGrid
      columns={2}
      gap={6}
      templateColumns={chakraResponsive({ mobile: "1fr", desktop: "1fr 1fr" })}
    >
      <Panel title="Edit blueprint">
        <form onSubmit={handleSubmit}>
          <Field name="title" validate={validateRequired}>
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

          {blueprintDescription && (
            <div>
              <hr css={devider} />
              <div>{data?.blueprint?.description || data?.blueprint_book?.description}</div>
              <hr css={devider} />
            </div>
          )}

          <Field name="tags">
            {({ field, meta }: FieldProps) => (
              <FormControl id="tags" isInvalid={meta.touched && !!meta.error} css={FieldStyle}>
                <FormLabel>Tags</FormLabel>
                <Select
                  css={{ maxWidth: "640px" }}
                  options={tagsOptions}
                  value={field.value}
                  onChange={(tags) => setFieldValue("tags", tags)}
                />
                <FormErrorMessage>{meta.error}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="string" validate={validateBlueprintString}>
            {({ field, meta }: FieldProps) => (
              <FormControl id="string" isInvalid={meta.touched && !!meta.error} css={FieldStyle}>
                <FormLabel>New blueprint string</FormLabel>
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
        <Box>{string && data && <ImageEditor string={string}></ImageEditor>}</Box>
      </Panel>
    </SimpleGrid>
  );
};

export const UserBlueprint: NextPage<UserBlueprintProps> = ({ blueprintPage, selected }) => {
  const router = useRouter();

  if (!blueprintPage) return null;

  return (
    <Formik
      initialValues={
        {
          title: blueprintPage.title,
          description: blueprintPage.description_markdown,
          string: "",
          tags: blueprintPage.tags || ([] as string[]),
        } as FormValues
      }
      onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
        setStatus("");

        const result = await fetch("/api/blueprint/edit", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            ...values,
            id: blueprintPage.id,
          }),
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
      <FormContent initialString={selected.string} />
    </Formik>
  );
};

export const getServerSideProps = pageHandler(async (context, { session, redirect }) => {
  const blueprintId = context.query.blueprintId ? (context.query.blueprintId as string) : null;

  if (!session || !blueprintId) {
    return redirect("/");
  }

  const blueprintPage = await getBlueprintPageById(blueprintId);

  if (!blueprintPage) {
    return redirect("/");
  }

  let selected!: UserBlueprintProps["selected"];

  if (blueprintPage.user_id !== session.user_id) {
    return redirect("/");
  }

  if (blueprintPage.blueprint_id) {
    const blueprint = await getBlueprintById(blueprintPage.blueprint_id);
    if (!blueprint) return;

    selected = {
      type: "blueprint",
      data: {
        id: blueprintPage.blueprint_id,
        blueprint_hash: blueprint.blueprint_hash,
      },
      string: (await getBlueprintStringByHash(blueprint.blueprint_hash)) as string,
    };
  } else if (blueprintPage.blueprint_book_id) {
    const blueprintBook = await getBlueprintBookById(blueprintPage.blueprint_book_id);
    if (!blueprintBook) return;

    selected = {
      type: "blueprint_book",
      data: {
        id: blueprintPage.blueprint_book_id,
        blueprint_hash: blueprintBook.blueprint_hash,
      },
      string: (await getBlueprintStringByHash(blueprintBook.blueprint_hash)) as string,
    };
  }

  return {
    props: {
      blueprintPage: blueprintPage,
      selected,
    },
  };
});

export default UserBlueprint;
