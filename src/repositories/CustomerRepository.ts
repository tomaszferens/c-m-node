import { eq } from "drizzle-orm";

import { db, tables } from "../database/client";

export class CustomerRepository {
  static findById(id: number) {
    return db.query.customer.findFirst({
      where: eq(tables.customer.id, id),
    });
  }
}
