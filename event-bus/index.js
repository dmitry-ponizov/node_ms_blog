const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

const events = [];
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  // });
  // axios.post("http://localhost:4006/events", event).catch((err) => {
  //   console.log(err.message);
  // });
  // axios.post("http://localhost:4007/events", event).catch((err) => {
  //   console.log(err.message);
  // });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
