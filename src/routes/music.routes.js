const express = require("express");
const multer = require("multer");
const authMiddleware =require("../middleware/auth.middleware")
const musicController = require("../controllers/music.controller");

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post("/upload", authMiddleware.authArtist,upload.single("music"), musicController.createMusic);
router.post("/album", authMiddleware.authArtist, musicController.createAlbum);

router.get("/",authMiddleware.authUser,musicController.getAllMusic)

router.get("/albums",authMiddleware.authUser,musicController.getAllAlbums)
router.get("/albums/:albumId",authMiddleware.authUser,musicController.getAlbumbyId)
module.exports = router;