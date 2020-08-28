const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.listen(port, function () {
  console.log(`YAAAS, App is listening on http://localhost:${port}`);
});

app.get("/", (request, response) => {
  console.log("Request /");
  response.send("Benne hat mich lieb, hat er gesagt!");
});
