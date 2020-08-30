const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const fetch = require("node-fetch");

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
    try {
      console.log(`YAAAS, App is listening on http://localhost:${port}`);
    } catch (error) {
      console.error("Pika Pika, something went wrong 😑", error);
    }
  });

  // GET ROUTES
  app.get("/", (request, response) => {
    try {
      console.log("Request /");
      response.send(
        "I'm aaaaaaaliiiiiiveeeeeee, ohhhhhhh I'm aliiiiiiiIiiiiiiiveee!"
      );
    } catch (error) {
      console.error("Pika Pika, something went wrong 😑", error);
    }
  });

  app.get("/api/pokemons", (request, response) => {
    try {
      console.log("Request /pokemons");
      response.json(pokemons);
    } catch (error) {
      console.error("Pika Pika, something went wrong 😑", error);
    }
  });

  app.get("/api/pokemons/:pokeName", async (request, response) => {
    try {
      console.log(`Request /pokemons/${request.params.pokeName}`);
      const pokemon = await collection.findOne({
        name: request.params.pokeName,
      });
      response.json(pokemon);
    } catch (error) {
      console.error("Pika Pika, something went wrong 😑", error);
    }
  });

  // POST ROUTES
  app.post("/api/pokemons", async (request, response) => {
    try {
      console.log("Post all pokemons an API");
      await collection.insertMany(pokemons);
      response.status(201).send("Catched'em all");
    } catch (error) {
      console.error("Pika Pika, something went wrong 😑", error);
    }
  });

  app.post(`/api/pokemon`, async (request, response) => {
    try {
      const pokemon = {
        name: request.body.name,
        id: request.body.id,
        imgSrc: request.body.imgSrc,
      };
      console.log("Post a new pokemon an API");
      await collection.insertOne(pokemon);
      response.status(201).send("Catched another one");
    } catch (error) {
      console.error("Pika Pika, something went wrong 😑", error);
    }
  });

  //PATCH ROUTES
  app.patch("/api/pokemons/:pokeName", async (request, response) => {
    try {
      console.log(`Patch /api/pokemons/${request.params.pokeName}`);
      const updatedPoke = await collection.updateOne(
        { name: request.params.pokeName },
        { $set: { name: request.body.name } }
      );
      response.json(updatedPoke);
    } catch (error) {
      console.error("Pika Pika, something went wrong 😑", error);
    }
  });

  // DELETE ROUTES
  app.delete("/api/pokemons/:pokeName", async (request, response) => {
    try {
      console.log(`Delete /api/pokemons/${request.params.pokeName}`);
      const poke = await collection.deleteOne({
        name: request.params.pokeName,
      });
      response.json(poke);
    } catch (error) {
      console.error("Pika Pika, something went wrong 😑", error);
    }
  });
}

main();
