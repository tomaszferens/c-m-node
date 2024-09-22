import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import { db } from "../src/database/client";
import { seed } from "../src/database/seed/seed";

void migrate(db, { migrationsFolder: "./drizzle" });
await seed();
