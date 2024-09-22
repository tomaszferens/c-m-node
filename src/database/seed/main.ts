import { seed } from "./seed";

export async function main() {
  return await seed();
}

main().then(console.log);
