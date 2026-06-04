import express from "express";
const router = express.Router();
export default router;

import db from "#db/client";
import {
  createPlaylist,
  getPlaylistById,
  getPlaylists,
} from "#db/queries/playlists";
import { getTracksByPlaylistId } from "#db/queries/tracks";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";

/** Routing middleware for GET /playlists */
router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

/** Routing middleware for POST /playlists
 * Creates a new empty playlist
 */
router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request must have a body.");

  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).send("Request body requires: name, description");

  const playlist = await createPlaylist({ name, description });
  res.status(201).send(playlist);
});

/** Routing middleware that allows reuse of the logic for parsing ID parameter */
router.param("id", async (req, res, next, id) => {
  // Try to find playlist with specified ID
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist cannot be found.");

  // Attach the playlist to the request object
  req.playlist = playlist;
  next();
});

/** Routing middleware for GET /playlists/:id */
router.get("/:id", async (req, res) => {
  res.send(req.playlist);
});

/** Routing middleware for GET /playlists/:id/tracks */
router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});

/** Routing middleware for POST /playlists/:id/tracks
 * adds a new track to the playlist
 * trackId should be sent in request body
 * Sends the created playlist_track with status 201*/
router.post("/:id/tracks", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body required.");

  const { trackId } = req.body;
  if (!trackId) return res.status(400).send("Request body requires: trackId");

  const playlistTrack = await createPlaylistTrack(req.playlist.id, trackId);
  res.status(201).send(playlistTrack);
});
