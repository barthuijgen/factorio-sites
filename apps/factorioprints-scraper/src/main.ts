import { writeToDatastore } from "./app/populate-db";
import { scanFactorioPrints } from "./app/scan";

// async function writeTestBP() {
//   const source =
//     "0eNrtkmFrgzAQhv/KuM+xNBq1zV8pQ9QdW5gmYtIykfz3mZRhh2VLpfsw6Me75J73eO8doWqO2PVCmqJS6h34OHc08MNF6d5EreS5rcWrLBvXM0OHwEEYbIGALFtXaYPYRPUbagOWgJAv+AGc2mcCKI0wAs8YXwyFPLYV9tOHqwACndLTjJJOb+JEyX6TEhiAs3yTWkf18vxiWwJNWeG0IXjIE506J+y1p8Q7ynK2z7OcbrM0mzfcWjL+V0923zwhC1D8d+bGD3PXmbsEJaGg7BcQCwXlN5+bBZ77CivyV5+BrnS4sjbihMXXaAifhvJ9PFcJPPJ6v7zeHrPkvjHzvBUxiIMF6EKA/iBgPwEPcWsm";
//   const { hash, string } = await parseBlueprintString(source);

//   console.log(`saving ${hash}`);

//   // use createBlueprint
//   saveBlueprintFromFactorioprints(
//     {
//       factorioprints_id: null,
//       title: "my blueprint",
//       description_markdown: "",
//       tags: [],
//       updated_at: Date.now() / 1000,
//       created_at: Date.now() / 1000,
//     },
//     string
//   );
// }

async function main() {
  // scanFactorioPrints(1, 3);
  writeToDatastore();
  // writeTestBP();
}

main().catch((reason) => {
  console.error(reason);
});
