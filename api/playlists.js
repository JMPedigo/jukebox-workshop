import express from "express";
const router = express.Router();
export default router;

import db from "#db/client";
import { createPlaylist, getPlaylists } from "#db/queries/playlists";

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
