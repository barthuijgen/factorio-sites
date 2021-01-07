import { createConnection } from "typeorm";
import { Blueprint } from "./entities";

export async function init() {
  await createConnection({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "local",
    database: "factorio-blueprints",
    entities: [Blueprint],
  });
}

init();
