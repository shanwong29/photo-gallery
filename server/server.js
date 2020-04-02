require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");

const port = process.env.PORT || 5005;
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const query = "girl";
const numOfPhoto = 12;
const orientation = "landscape";

app.get("/api/photos", async (req, res) => {
  const randomNum = Math.floor(Math.random() * 3) + 1;
  try {
    let response = await axios.get(
      `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&page=${randomNum}&query=${query}&per_page=${numOfPhoto}&orientation=${orientation}`
    );
    res.json(response.data);
  } catch (err) {
    res.json({ err: err.message });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
