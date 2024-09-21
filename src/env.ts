import { z } from "zod";

const zodEnvSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
});

function parseEnv() {
  try {
    return zodEnvSchema.parse(process.env);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const { fieldErrors } = err.flatten();
      const errorMessage = Object.entries(fieldErrors)
        .map(([field, errors]) =>
          errors ? `"${field}": ${errors.join(", ")}` : field,
        )
        .join("\n  ");
      throw new Error(`Missing environment variables:\n  ${errorMessage}`);
    }
    throw err;
  }
}

export const env = parseEnv();
