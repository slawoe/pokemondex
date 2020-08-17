import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Items from "./pages/Items";
import ThePokemons from "./pages/ThePokemons";

// function waitFor(time) {
//   return new Promise((resolve) => setTimeout(resolve, time));
// }
function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/pokemons">
            <ThePokemons></ThePokemons>
          </Route>
        </Switch>
        <Switch>
          <Route path="/items">
            <Items></Items>
          </Route>
        </Switch>
        <Switch>
          <Redirect to="/pokemons" />
        </Switch>
        <footer>
          <Link to="/pokemons">Pokemons</Link>
          <Link to="/items">Items</Link>
        </footer>
      </div>
    </Router>
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
