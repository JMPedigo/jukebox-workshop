import db from "#db/client";

/** POST /tracks creates a new track */
export async function createTrack({ name, duration_ms }) {
  const sql = `
  INSERT INTO tracks
    (name, duration_ms)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [track],
  } = await db.query(sql, [name, duration_ms]);
  return track;
}

/**GET /tracks sends an array to all tracks */
export async function getTracks() {
  const sql = `
    SELECT *
    FROM tracks
    `;
  const { rows: tracks } = await db.query(sql);
  return tracks;
}

/** GET /track/:id sends track specified by id*/
export async function getTrackById(id) {
  const sql = `
    SELECT *
    FROM tracks
    WHERE id = $1
    `;
  const {
    rows: [track],
  } = await db.query(sql, [id]);
  return track;
}

/** GET /playlists/:id/tracks sends all tracks in the playlist */
export async function getTracksByPlaylistId(id) {
  const sql = `
    SELECT tracks.*
    FROM
      tracks
      JOIN playlists_tracks ON playlists_tracks.track_id = tracks.id
      JOIN playlists ON playlists.id = playlists_tracks.playlist_id
    WHERE playlists.id = $1
    `;
  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}
