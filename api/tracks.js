import express from "express";
const router = express.Router();
export default router;

import db from "#db/client";
import { getTracks } from "#db/queries/tracks";

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});
