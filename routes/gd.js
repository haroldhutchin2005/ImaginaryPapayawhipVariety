const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/gd", async (req, res) => {
  try {
    const edits = [
      "geometry dash gameplay ",
      "geometry dash 2.2 gameplay ",
      "geometry dash",
      "geometry dash video",
      "mulpan geometry dash",
      "congregation jumpscare",
      "tidal wave gd",
    ];
    const randomIndex = Math.floor(Math.random() * edits.length);
    const randomEdit = edits[randomIndex];

    const response = await axios.get(
      `https://jonellccapisprojectv2-a62001f39859.herokuapp.com/api/tiktok/searchvideo?keywords=${encodeURIComponent(
        randomEdit,
      )}`,
      {
        timeout: 5000, // wait for 5 seconds max
      },
    );

    if (response.status !== 200) {
      throw new Error("Server responded with non-ok status");
    }

    const videos = response.data.data.videos;
    if (!videos || videos.length === 0) {
      return res.status(404).send("No videos found.");
    }

    const randomVideoIndex = Math.floor(Math.random() * videos.length);
    const videoData = videos[randomVideoIndex];

    if (res.headersSent) {
      return;
    }

    const message = `Random Memes From TikTok\n\nPost by: ${videoData.author.nickname}\nUsername: ${videoData.author.unique_id}\n\nContent: ${videoData.title}`;
    // TODO: Send the message variable to the user with attachment

    const videoUrl = videoData.play;
    const videoResponse = await axios({
      method: "get",
      url: videoUrl,
      responseType: "stream",
      timeout: 5000,
    });

    const filePath = path.join(__dirname, "../");
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    const videoFilePath = path.join(filePath, "gd_edit.mp4");
    const writer = fs.createWriteStream(videoFilePath);
    videoResponse.data.pipe(writer);

    writer.on("finish", () => {
      res.sendFile(videoFilePath, () => fs.unlinkSync(videoFilePath));
    });
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      res.status(500).send("Failed to retrieve, please try again later.");
    } else {
      console.error("Error:", error.message);
      res.status(500).send("An error occurred while processing the request.");
    }
  }
});

module.exports = router;
