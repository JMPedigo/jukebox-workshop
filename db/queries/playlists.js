import db from "#db/client";

export async function createPlaylist({ name, description }) {
  const sql = `
    INSERT INTO playlists
      (name, description)
    VALUES
      ($1, $2)
    RETURNING *
    `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);
  return playlist;
}

/** GET /playlists sends an array of all playlists */
export async function getPlaylists() {
  const sql = `
    SELECT *
    FROM playlists
    `;
  const { rows: playlists } = await db.query(sql);
  return playlists;
}
