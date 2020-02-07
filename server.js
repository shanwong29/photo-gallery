const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();
const port = 5005;

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const query = "Hong Kong street view";
const numOfPhoto = 12;
const orientation = "portrait";

app.get("/api/photos", async (req, res) => {
  try {
    let response = await axios.get(
      `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&page=1&query=${query}&per_page=${numOfPhoto}&orientation=${orientation}`
    );
    res.json(response.data);
  } catch (err) {
    res.json({ err: err.message });
  }
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
