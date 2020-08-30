const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const fetch = require("node-fetch");
const { response } = require("express");

//FETCHPOKEMONS
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

  // GET

  app.get("/", (request, response) => {
    console.log("Request /");
    response.send(
      "I'm aaaaaaaliiiiiiveeeeeee, ohhhhhhh I'm aliiiiiiiIiiiiiiiveee!"
    );
  });

  app.get("/api/pokemons", (request, response) => {
    console.log("Request /");
    response.send(pokemons);
  });

  app.get("/api/pokemons/:pokeID", async (request, response) => {
    console.log("Request /");
    console.log(request.params.pokeID);
    const poke = await collection.findOne({ name: request.params.pokeID });
    response.json(poke);
  });

  // POST
  app.post("/api/pokemons", async (req, res) => {
    console.log("Post pokemons an API");
    await collection.insertMany(pokemons);
    res.status(201).send("There they are");
  });

  app.post("/api/pokemon", async (req, res) => {
    const pokemon = {
      name: req.body.name,
      id: req.body.id,
      imgSrc: req.body.imgSrc,
    };
    console.log("Post pokemons an API");
    await collection.insertOne(pokemon);
    res.status(201).send("There it is");
  });

  //PATCH

  app.patch("/api/pokemons/:pokeID", async (request, response) => {
    console.log("Patch /");
    console.log(request.params.pokeID);
    const updatedPoke = await collection.updateOne(
      { name: request.params.pokeID },
      { $set: { name: request.body.name } }
    );
    response.json(updatedPoke);
  });

  // DELETE
  app.delete("/api/pokemons/:pokeID", async (request, response) => {
    console.log("Request /");
    console.log(request.params.pokeID);
    const poke = await collection.deleteOne({ name: request.params.pokeID });
    response.json(poke);
  });
}

main();
