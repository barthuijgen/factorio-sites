import { NextApiHandler } from "next";
import { getBlueprintPageById, getBlueprintStringByHash, prisma } from "@factorio-sites/database";
import { parseBlueprintString } from "@factorio-sites/node-utils";
import { apiHandler, ApiError } from "../../../utils/api-handler";
import { ChildTree } from "@factorio-sites/types";

const validateBlueprintBook = async (blueprint_book_id: string) => {
  const book = await prisma.blueprint_book.findUnique({
    where: { id: blueprint_book_id },
    include: {
      blueprint_books: true,
      blueprints: true,
    },
  });

  if (!book) return false;

  const string = await getBlueprintStringByHash(book.blueprint_hash);
  if (!string) {
    throw new ApiError(500, "failed to fetch string", { id: book.id, hash: book.blueprint_hash });
  }
  const { data } = await parseBlueprintString(string);

  if (!data.blueprint_book || !book.child_tree) return;

  const child_tree = (book.child_tree as unknown) as ChildTree;

  data.blueprint_book?.blueprints.forEach((data_bp, index) => {
    console.log(data_bp);
    console.log(child_tree[index]);
  });

  return true;
};
const DISABLED = true;
const handler: NextApiHandler = apiHandler(async (req, res) => {
  if (DISABLED) throw new ApiError(400, "disabled");
  if (!req.query.id) throw new ApiError(400, "No id in query");
  if (!req.query.type) throw new ApiError(400, "No type in query");

  if (req.query.type === "page") {
    const blueprintPage = await getBlueprintPageById(req.query.id as string);
    if (!blueprintPage) return res.status(404).json({ error: "Blueprint page not found" });

    console.log(`Validate page ${blueprintPage.id}`);

    if (blueprintPage.blueprint_id) {
      return res.json({ valid: true });
    }

    if (blueprintPage.blueprint_book_id) {
      const valid = await validateBlueprintBook(blueprintPage.blueprint_book_id);
      return res.json({ valid });
    }
  } else if (req.query.type === "book") {
    const valid = await validateBlueprintBook(req.query.id as string);
    return res.json({ valid });
  }

  return res.json({ valid: true });
});

export default handler;
