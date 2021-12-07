import * as path from "path";
import * as dotenv from "dotenv";
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

dotenv.config({ path: path.join(__dirname, ".env") });

// const account = new gcp.serviceaccount.Account("factorio-blueprints", {
//   accountId: "factorio-blueprints",
//   displayName: "Factorio blueprints service account",
// });
// Can't get service account roles sorted, manual steps
// 1. Add a member in IAM with the same email as the service account
// 2. Assign roles to that member in IAM
// Roles used: Pub/Sub Editor, Secret Manager Secret Accessor, Storage Object Admin

// const postgresPasswordSecret = new gcp.secretmanager.Secret("prd-postgres-password", {
//   replication: { automatic: true },
//   secretId: "prd-postgres-password",
// });

// const postgresPasswordSecretVersion = new gcp.secretmanager.SecretVersion(
//   "prd-postgres-password-version",
//   {
//     secret: postgresPasswordSecret.id,
//     secretData: process.env.DATABASE_PASSWORD,
//   }
// );

const functionsBucket = new gcp.storage.Bucket("blueprint-thumbnail-render-code", {
  storageClass: "STANDARD",
  location: "EUROPE-WEST1",
});

// const blueprintImagesBucket = new gcp.storage.Bucket("blueprint-thumbnail-images", {
//   storageClass: "STANDARD",
//   location: "EUROPE-WEST1",
// });

const archive = new gcp.storage.BucketObject("archive", {
  bucket: functionsBucket.name,
  source: new pulumi.asset.FileArchive("../dist/apps/blueprint-image-function"),
});

// const renderTopic = new gcp.pubsub.Topic("blueprint-thumbnail-render");

new gcp.cloudfunctions.Function("blueprint-image-render", {
  eventTrigger: {
    eventType: "google.pubsub.topic.publish",
    resource: process.env.IMAGE_RENDER_TOPIC,
  },
  sourceArchiveBucket: functionsBucket.name,
  sourceArchiveObject: archive.name,
  entryPoint: "renderImagePubSub",
  runtime: "nodejs14",
  region: "europe-west1",
  timeout: 60,
  environmentVariables: {
    POSTGRES_DB: "factorio-blueprints",
    POSTGRES_USER: "factorio-blueprints",
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    GCP_BLUEPRINT_IMAGES_BUCKET: "blueprint-images",
  },
  serviceAccountEmail: process.env.RENDER_FUNCTION_SERVICE_ACCOUNT,
});
