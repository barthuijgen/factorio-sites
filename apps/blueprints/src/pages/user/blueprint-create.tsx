import React, { useEffect, useState, useMemo } from "react";
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
import { Formik, Field, FieldProps, useFormikContext } from "formik";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { chakraResponsive, parseBlueprintStringClient } from "@factorio-sites/web-utils";
import { TAGS } from "@factorio-sites/common-utils";
import { Panel } from "../../components/Panel";
import {
  joinValidations,
  validateBlueprintString,
  validateRequired,
  validateTags,
} from "../../utils/validate";
import { ImageEditor } from "../../components/ImageEditor";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { MDEditor } from "../../components/MDEditor";
import { pageHandler } from "../../utils/page-handler";
import { BlueprintStringData } from "@factorio-sites/types";
import { BookChildTree, convertBlueprintBookDataToTree } from "../../components/BookChildTree";
import { Tooltip } from "../../components/Tooltip";
import { Markdown } from "../../components/Markdown";

const FieldStyle = css`
  margin-bottom: 1rem;
`;

const StyledMarkdown = styled(Markdown)`
  max-height: 400px;
  margin-bottom: 1rem;
  border: 1px solid rgb(226, 232, 240);
  border-radius: 4px;
  padding: 0.5rem 1rem;
`;

interface FormValues {
  title: string;
  description: string;
  string: string;
  tags: string[];
}

const FormContent: React.FC = () => {
  const {
    values,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    status,
  } = useFormikContext<FormValues>();

  const [blueprintData, setBlueprintData] = useState<BlueprintStringData | null>(null);
  const [step, setStep] = useState(0);

  const tagsOptions = TAGS.map((tag) => ({
    label: `${tag.category}: ${tag.label}`,
    value: tag.value,
  }));

  const description =
    blueprintData?.blueprint?.description || blueprintData?.blueprint_book?.description || "";

  const book_item = useMemo(
    () =>
      blueprintData?.blueprint_book && convertBlueprintBookDataToTree(blueprintData.blueprint_book),
    [blueprintData?.blueprint_book]
  );

  useEffect(() => {
    if (values.string) {
      const data = parseBlueprintStringClient(values.string);
      if (data) {
        setBlueprintData(data);
        setFieldValue("title", data.blueprint?.label || data.blueprint_book?.label || "");
        return;
      }
    }
    setBlueprintData(null);
  }, [values.string, setFieldValue]);

  const onClickNext = () => {
    if (blueprintData) {
      setStep(1);
    }
  };

  return (
    <SimpleGrid
      columns={2}
      gap={6}
      templateColumns={chakraResponsive({ mobile: "1fr", desktop: "1fr 1fr" })}
    >
      <Panel title="Create new blueprint">
        <form onSubmit={handleSubmit}>
          {step === 0 ? (
            <>
              <Field
                name="string"
                validate={joinValidations(validateRequired, validateBlueprintString)}
              >
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
                <Button
                  primary
                  type="button"
                  css={{ marginRight: "1rem" }}
                  disabled={!blueprintData}
                  onClick={onClickNext}
                >
                  Next
                </Button>
                {status && <Text css={{ marginLeft: "1rem", color: "red" }}>{status}</Text>}
              </Box>
            </>
          ) : (
            <>
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
                    isRequired
                    isInvalid={meta.touched && !!meta.error}
                    css={FieldStyle}
                  >
                    <FormLabel>
                      Description{" "}
                      <Tooltip text="This description is shown next to the description already stored in the blueprint." />
                    </FormLabel>
                    <MDEditor
                      value={field.value}
                      onChange={(value) => setFieldValue("description", value)}
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {description && (
                <>
                  <div css={{ marginBottom: "0.5rem" }}>Blueprint description</div>
                  <StyledMarkdown>{description}</StyledMarkdown>
                </>
              )}

              <Field name="tags" validate={validateTags}>
                {({ field, meta }: FieldProps) => (
                  <FormControl id="tags" isInvalid={meta.touched && !!meta.error} css={FieldStyle}>
                    <FormLabel>Tags</FormLabel>
                    <Select
                      options={tagsOptions}
                      value={field.value || []}
                      onChange={(tags) => setFieldValue("tags", tags)}
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Box css={{ display: "flex", alignItems: "center" }}>
                <Button type="button" css={{ marginRight: "1rem" }} onClick={() => setStep(0)}>
                  Previus
                </Button>
                <Button primary type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
                {status && <Text css={{ marginLeft: "1rem", color: "red" }}>{status}</Text>}
              </Box>
            </>
          )}
        </form>
      </Panel>
      <Panel title="Preview">
        <Box>
          {book_item ? (
            <BookChildTree book_item={book_item} selected_id={null} />
          ) : values.string ? (
            <ImageEditor string={values.string} />
          ) : null}
        </Box>
      </Panel>
    </SimpleGrid>
  );
};

export const UserBlueprintCreate: NextPage = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{ title: "", description: "", string: "", tags: [] }}
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
      <FormContent />
    </Formik>
  );
};

export const getServerSideProps = pageHandler(async (_, { session, redirect }) => {
  if (!session) return redirect("/");
});

export default UserBlueprintCreate;
