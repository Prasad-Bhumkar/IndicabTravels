

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

function defineConfig(config: { out: string; schema: string; dialect: string; dbCredentials: { url: string; }; }) {
  // In most config files, defineConfig is a helper that just returns the config object.
  return config;
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

