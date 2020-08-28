const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const fetch = require("node-fetch");
const { response } = require("express");

// const { fetchPokemons } = require("./src/api/Pokemons.js");

async function fetchPokemons() {
  const response = await fetch(
    "https://unpkg.com/pokemons@1.1.0/pokemons.json"
  );
  if (!response.ok) {
    throw new Error(response);
  }
  const result = await response.json();
  const pokemons = result.results.map((pokemon) => ({
    name: pokemon.name,
    id: pokemon.national_number,
    imgSrc: pokemon.sprites.animated,
  }));
  const uniquePokemons = pokemons.filter(
    (pokemon, index) =>
      pokemons.findIndex((other) => other.id === pokemon.id) === index
  );
  return uniquePokemons;
}

const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());

const port = 3000;
// app.use("/api/admin", admin);

async function main() {
  await client.connect();
  const database = client.db(process.env.MONGO_DB_NAME);
  const collection = database.collection("pokemons");

  const pokemons = await fetchPokemons();
  console.log(pokemons);

  app.listen(port, function () {
    console.log(`YAAAS, App is listening on http://localhost:${port}`);
  });

  app.post("/api/pokemons", async (req, res) => {
    console.log("Post pokemons an API");
    await collection.insertMany(pokemons);
    res.status(201).send("There they are");
  });

  app.get("/", (request, response) => {
    console.log("Request /");
    response.send(
      "TODO: Jonas Imm verprügeln und ihm den Bing-Virus unterschieben!"
    );
  });
}

main();
