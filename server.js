const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());

const port = 3000;
app.use("/api/admin", admin);

async function main() {
  await client.connect();
  const database = client.db(process.env.MONGO_DB_NAME);
  app.listen(port, function () {
    console.log(`YAAAS, App is listening on http://localhost:${port}`);
  });

  app.get("/", (request, response) => {
    console.log("Request /");
    response.send(
      "TODO: Jonas Imm verprügeln und ihm den Bing-Virus unterschieben!"
    );
  });
}

main();
