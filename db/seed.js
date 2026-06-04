import db from "#db/client";
import { faker } from "@faker-js/faker";

import { createPlaylist } from "./queries/playlist";
import { createTrack } from "./queries/tracks";
import createPlaylistTrack from "./queries/playlists_tracks";
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

/** seed the database with:
 * at least 20 tracks and 10 playlists.
 */
async function seed() {
  for (let i = 1; i <= 15; i++) {
    await createPlaylist({
      name: faker.music.album(),
      description: faker.music.genre(),
    });
    await createTrack({
      name: faker.music.songName(),
      duration_ms: Math.floor(Math.random() * 750000),
    });
  }
  /** Create at least 15 playlists_tracks so that some of the seeded tracks belong to some of the seeded playlists. */
  for (let i = 1; i <= 15; i++) {
    const playlistId = 1 + Math.floor(i / 2);
    await createPlaylistTrack(playlistId, i);
  }
}
