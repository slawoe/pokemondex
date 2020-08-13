import React from "react";
import "./App.css";
import List from "./components/List";
import ListItem from "./components/ListItem";
import ListImg from "./components/ListImg";
import ListItemText from "./components/ListItemText";
import ListIcon from "./components/ListIcon";
import { fetchPokemons } from "../src/api/Pokemons";

function waitFor(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function App() {
  const [pokemons, setPokemons] = React.useState(null);
  const [IsLoaded, setIsLoaded] = React.useState(false);
  const [query, setQuery] = React.useState("");

  // Leons Weg
  React.useEffect(() => {
    async function fetchData() {
      // await waitFor(5000);
      const allPokemons = await fetchPokemons();
      setIsLoaded(true);
      setPokemons(allPokemons);
    }
    fetchData();
  }, []);

  const filteredPokemons = pokemons?.filter((pokemon) => {
    return pokemon.name.startsWith(query);
  });

  if (!IsLoaded) {
    return (
      <h1 className="title loading">
        Aren't you too old for Pokemons? Ok... If you really need it: I'm
        loading, kid!
      </h1>
    );
  }
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Pokedex</h1>
        <input
          className="input"
          placeholder="Search your Pokemon..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {/* <button onClick={handleClick}>Load pokemons</button> */}
      </header>
      <main className="pokeList">
        <List>
          {filteredPokemons?.map((pokemon) => (
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

// mögliche Schreibweise außerhalb unseres Returns, jedoch nicht genutzt
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

// const handleClick = async () => {
//   const allPokemons = await fetchPokemons();
//   setPokemons(allPokemons);
// };

// mein Weg
// useEffect(() => {
//   const timer = setTimeout(async () => {
//     const allPokemons = await fetchPokemons();
//     setPokemons(allPokemons);
//     console.log(`After 5 second`);
//   }, 5000);
//   return () => clearTimeout(timer);
// }, []);
