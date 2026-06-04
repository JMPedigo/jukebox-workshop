import db from "#db/client";
import { faker } from "@faker-js/faker";

import { createPlaylist } from "./queries/playlist";
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

/** seed the database with:
 * at least 20 tracks and 10 playlists.
 * Create at least 15 playlists_tracks so that some of the seeded tracks belong to some of the seeded playlists. */
async function seed() {
  for (let i = 1; i <= 15; i++) {
    await createPlaylist({
      name: faker.music.album(),
      description: faker.music.genre(),
    });
  }
}
