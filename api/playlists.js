import express from "express";
const router = express.Router();
export default router;

import db from "#db/client";
import { getPlaylists } from "#db/queries/playlists";

/** Routing middleware for GET /playlists */
router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});
