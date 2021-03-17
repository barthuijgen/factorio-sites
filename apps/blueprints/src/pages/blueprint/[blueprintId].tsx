import React, { useEffect } from "react";
import { NextPage } from "next";
import {
  getBlueprintBookById,
  getBlueprintById,
  getBlueprintPageWithUserById,
  isBlueprintPageUserFavorite,
} from "@factorio-sites/database";
import { BlueprintBook, Blueprint, BlueprintPage } from "@factorio-sites/types";
import { timeLogger } from "@factorio-sites/common-utils";
import { pageHandler } from "../../utils/page-handler";
import { BlueprintSubPage } from "../../components/blueprint/Blueprint";
import { BlueprintBookSubPage } from "../../components/blueprint/BlueprintBook";

type Selected =
  | { type: "blueprint"; data: Pick<Blueprint, "id" | "blueprint_hash" | "image_hash" | "label"> }
  | { type: "blueprint_book"; data: Pick<BlueprintBook, "id" | "blueprint_hash" | "label"> };

interface IndexProps {
  selected: Selected;
  blueprint: Blueprint | null;
  blueprint_book: BlueprintBook | null;
  blueprint_page: BlueprintPage;
  favorite: boolean;
}

export const Index: NextPage<IndexProps> = ({
  selected,
  blueprint,
  blueprint_book,
  blueprint_page,
  favorite,
}) => {
  useEffect(() => {
    console.log({
      selected,
      blueprint,
      blueprint_book,
      blueprint_page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (blueprint) {
    return (
      <BlueprintSubPage blueprint={blueprint} blueprint_page={blueprint_page} favorite={favorite} />
    );
  } else if (blueprint_book) {
    return (
      <BlueprintBookSubPage
        selected={selected}
        blueprint_book={blueprint_book}
        blueprint_page={blueprint_page}
        favorite={favorite}
      />
    );
  } else {
    return <div>404</div>;
  }
};

export const getServerSideProps = pageHandler(async (context, { session }) => {
  const throwError = (message: string) => {
    if (!blueprint_page && context.res) {
      context.res.statusCode = 404;
      context.res.end(JSON.stringify({ error: message }));
      return { props: {} };
    }
  };

  const tl = timeLogger("getServerSideProps");
  const selected_id = context.query.selected ? (context.query.selected as string) : null;
  const type = context.query.type ? (context.query.type as string) : null;
  const blueprintId = context.query.blueprintId ? (context.query.blueprintId as string) : null;

  if (!blueprintId) return throwError("Blueprint ID not found");

  const blueprint_page = await getBlueprintPageWithUserById(blueprintId);
  tl("getBlueprintPageWithUserById");

  if (!blueprint_page) return throwError("Blueprint page not found");

  let blueprint: IndexProps["blueprint"] = null;
  let blueprint_book: IndexProps["blueprint_book"] = null;
  let selected!: IndexProps["selected"];
  let selected_blueprint!: Blueprint | null;
  let selected_blueprint_book!: BlueprintBook | null;

  if (blueprint_page.blueprint_id) {
    blueprint = await getBlueprintById(blueprint_page.blueprint_id);
    selected_blueprint = blueprint;
    tl("getBlueprintById");
  } else if (blueprint_page.blueprint_book_id) {
    blueprint_book = await getBlueprintBookById(blueprint_page.blueprint_book_id);
    if (selected_id && type === "book") {
      selected_blueprint_book = await getBlueprintBookById(selected_id);
      tl("getBlueprintBookById");
    } else if (selected_id && type !== "book") {
      selected_blueprint = await getBlueprintById(selected_id);
      tl("getBlueprintById");
    } else if (blueprint_book) {
      selected_blueprint_book = blueprint_book;
    }
  }

  if (selected_blueprint) {
    selected = {
      type: "blueprint",
      data: {
        id: selected_blueprint.id,
        blueprint_hash: selected_blueprint.blueprint_hash,
        image_hash: selected_blueprint.image_hash,
        label: selected_blueprint.label,
      },
    };
  } else if (selected_blueprint_book) {
    selected = {
      type: "blueprint_book",
      data: {
        id: selected_blueprint_book.id,
        blueprint_hash: selected_blueprint_book.blueprint_hash,
        label: selected_blueprint_book.label,
      },
    };
  }

  const favorite = session
    ? !!(await isBlueprintPageUserFavorite(session.user.id, blueprint_page.id))
    : false;

  return {
    props: {
      blueprint,
      blueprint_book,
      selected,
      blueprint_page,
      favorite,
    } as IndexProps,
  };
});

export default Index;
