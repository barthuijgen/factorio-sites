import { useEffect, useState, useMemo, useCallback } from "react";
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
import { useForm, Controller } from "react-hook-form";

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
  serverError: string;
}

export const UserBlueprintCreate: NextPage = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    mode: "onTouched",
  });

  const [step, setStep] = useState(0);
  const [blueprintData, setBlueprintData] = useState<BlueprintStringData | null>(null);

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

  const watchString = watch("string");

  useEffect(() => {
    if (watchString) {
      const data = parseBlueprintStringClient(watchString);
      if (data) {
        setBlueprintData(data);
        setValue("title", data.blueprint?.label || data.blueprint_book?.label || "");
        return;
      }
    }
    setBlueprintData(null);
  }, [watchString, setValue]);

  const onClickNext = useCallback(() => {
    if (blueprintData) {
      setStep(1);
    }
  }, [blueprintData, setStep]);

  const onSubmit = async (values: FormValues) => {
    const result = await fetch("/api/blueprint/create", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    if (result.status) {
      setError("serverError", { message: result.status });
    } else if (result.errors) {
      setError("serverError", {
        message: result.errors.string ? result.errors.string : "Something went wrong",
      });
    } else if (result.success) {
      router.push(`/blueprint/${result.id}`);
    }
  };

  return (
    <form
      onSubmit={(ev) => {
        clearErrors("serverError");
        handleSubmit(onSubmit)(ev);
      }}
    >
      <SimpleGrid
        columns={2}
        gap={6}
        templateColumns={chakraResponsive({ mobile: "1fr", desktop: "1fr 1fr" })}
      >
        <Panel title="Create new blueprint">
          {step === 0 ? (
            <div key="step1">
              <Controller
                name="string"
                control={control}
                defaultValue=""
                rules={{ validate: joinValidations(validateRequired, validateBlueprintString) }}
                render={({ field, fieldState }) => (
                  <FormControl
                    id="string"
                    isRequired
                    isInvalid={fieldState.isTouched && !!fieldState.error}
                    css={FieldStyle}
                  >
                    <FormLabel>Blueprint string</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
                  </FormControl>
                )}
              />
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
                {errors.string && (
                  <Text css={{ marginLeft: "1rem", color: "red" }}>{errors.string.message}</Text>
                )}
              </Box>
            </div>
          ) : (
            <div key="step2">
              <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{ required: "Title is required" }}
                render={({ field, fieldState }) => (
                  <FormControl
                    id="title"
                    isRequired
                    isInvalid={fieldState.isTouched && !!fieldState.error}
                    css={FieldStyle}
                  >
                    <FormLabel>Title</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
                  </FormControl>
                )}
              />

              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{ required: "Description is required" }}
                render={({ field, fieldState }) => (
                  <FormControl
                    id="description"
                    isRequired
                    isInvalid={fieldState.isTouched && !!fieldState.error}
                    css={FieldStyle}
                  >
                    <FormLabel>
                      Description{" "}
                      <Tooltip text="This description is shown next to the description already stored in the blueprint." />
                    </FormLabel>
                    <MDEditor {...field} />
                    <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                  </FormControl>
                )}
              />

              {description && (
                <>
                  <div css={{ marginBottom: "0.5rem" }}>Blueprint description</div>
                  <StyledMarkdown>{description}</StyledMarkdown>
                </>
              )}

              <Controller
                name="tags"
                control={control}
                defaultValue={[]}
                rules={{ validate: validateTags }}
                render={({ field, fieldState }) => (
                  <FormControl
                    id="tags"
                    isInvalid={fieldState.isTouched && !!fieldState.error}
                    css={FieldStyle}
                  >
                    <FormLabel>Tags</FormLabel>
                    <Select options={tagsOptions} value={field.value} onChange={field.onChange} />
                    <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
                  </FormControl>
                )}
              />

              <Box css={{ display: "flex", alignItems: "center" }}>
                <Button type="button" css={{ marginRight: "1rem" }} onClick={() => setStep(0)}>
                  Previus
                </Button>
                <Button primary type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
                {errors.serverError && (
                  <Text css={{ marginLeft: "1rem", color: "red" }}>
                    {errors.serverError.message}
                  </Text>
                )}
              </Box>
            </div>
          )}
        </Panel>
        <Panel title="Preview">
          <Box>
            {book_item ? (
              <BookChildTree book_item={book_item} selected_id={null} />
            ) : watchString ? (
              <ImageEditor string={watchString} />
            ) : null}
          </Box>
        </Panel>
      </SimpleGrid>
    </form>
  );
};

export const getServerSideProps = pageHandler(async (_, { session, redirect }) => {
  if (!session) return redirect("/");
});

export default UserBlueprintCreate;
