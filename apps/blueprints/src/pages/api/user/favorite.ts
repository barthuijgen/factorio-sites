import { isBlueprintPageUserFavorite, createUserFavorite, prisma } from "@factorio-sites/database";
import { apiHandler } from "../../../utils/api-handler";

const handler = apiHandler(async (req, res, { session }) => {
  if (req.method !== "POST") return res.status(400).json({ error: "method must be POST" });

  const { blueprint_page_id } = req.body;

  if (session) {
    const user = session.user;

    const existing = await isBlueprintPageUserFavorite(user.id, blueprint_page_id);

    if (existing) {
      await prisma.user_favorites.delete({
        where: {
          user_id_blueprint_page_id: {
            user_id: existing.user_id,
            blueprint_page_id: existing.blueprint_page_id,
          },
        },
      });
    } else {
      await createUserFavorite(user.id, blueprint_page_id);
    }

    return res.status(200).json({
      favorite: !existing,
    });
  }

  res.status(404).json({
    auth: null,
  });
});

export default handler;
