import React from "react";
import "./App.css";
import List from "./components/List";
import ListItem from "./components/ListItem";
import ListImg from "./components/ListImg";
import ListItemText from "./components/ListItemText";
import ListIcon from "./components/ListIcon";
import Bulbasaur from "../src/assets/bulbasaur.png";

const bulbasaur = {
  name: "Bulbasaur",
  imgSrc: "https://img.pokemondb.net/artwork/large/bulbasaur.jpg",
  id: "001",
  link: "#bulbasaur",
};

const ivysaur = {
  name: "Ivysaur",
  imgSrc: "https://img.pokemondb.net/artwork/large/ivysaur.jpg",
  id: "002",
  link: "#ivysaur",
};

const pokemons = [ivysaur, bulbasaur];
// const pokemons = [
//   {
//     name: "Bulbasaur",
//     imgSrc: "https://img.pokemondb.net/artwork/large/bulbasaur.jpg",
//     id: "001",
//     link: "#bulbasaur",
//   },
//   {
//     name: "Ivysaur",
//     imgSrc: "https://img.pokemondb.net/artwork/large/ivysaur.jpg",
//     id: "002",
//     link: "#ivysaur",
//   },
// ];

const pokemonListFromArray = pokemons.map((pokemon) => console.log(pokemon));

function App() {
  // const listItems = pokemons.map((pokemon) => (
  //   <ListItem href={pokemon.link}>
  //     <ListImg
  //       src={pokemon.imgSrc}
  //       alt={`Picture of ${pokemon.name}`}
  //     ></ListImg>
  //     <ListItemText
  //       primary={pokemon.name}
  //       secondary={`#${pokemon.id}`}
  //     ></ListItemText>
  //     <ListIcon src="" alt="#"></ListIcon>
  //   </ListItem>
  // ));

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Pokedex</h1>
        <input className="input" placeholder="Search your Pokemon..." />
      </header>
      <main className="pokeList">
        <List>
          {pokemons.map((pokemon) => (
            <ListItem key={pokemon.id} href={pokemon.link}>
              <ListImg
                src={pokemon.imgSrc}
                alt={`Picture of ${pokemon.name}`}
              ></ListImg>
              <ListItemText
                primary={pokemon.name}
                secondary={`#${pokemon.id}`}
              ></ListItemText>
              <ListIcon src="" alt="#"></ListIcon>
            </ListItem>
          ))}
        </List>
      </main>
    </div>
  );
}

export default App;
