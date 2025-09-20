const express = require("express");
const router = express.Router();
const Meme = require("../models/Meme");

// POST /memes
router.post("/", async (req, res) => {
  try {
    const meme = new Meme(req.body);
    await meme.save();
    res.status(201).json(meme);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /memes
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const memes = userId
      ? await Meme.find({ userId })
      : await Meme.find();
    res.json(memes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
