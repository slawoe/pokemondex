import React from "react";
import List from "../components/List";
import ListItem from "../components/ListItem";
import ListImg from "../components/ListImg";
import ListItemText from "../components/ListItemText";
import ListIcon from "../components/ListIcon";
import { fetchPokemons } from "../api/Pokemons";
import LoadingScreen from "../components/LoadingScreen";

// function waitFor(time) {
//   return new Promise((resolve) => setTimeout(resolve, time));
// }
function ThePokemons() {
  const [pokemons, setPokemons] = React.useState(null);
  const [IsLoaded, setIsLoaded] = React.useState(true);
  const [query, setQuery] = React.useState("");

  // Leons Weg
  React.useEffect(() => {
    async function fetchData() {
      // await waitFor(5000);
      const allPokemons = await fetchPokemons();
      //   setIsLoaded(true);
      setPokemons(allPokemons);
    }
    fetchData();
  }, []);

  const filteredPokemons = pokemons?.filter((pokemon) => {
    return pokemon.name.startsWith(query);
  });

  if (!IsLoaded) {
    return <LoadingScreen></LoadingScreen>;
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
            <ListItem
              key={pokemon.id}
              href={`/pokemons/${pokemon.name.toLowerCase()}`}
            >
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

export default ThePokemons;
