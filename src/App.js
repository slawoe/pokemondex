import React from "react";
import "./App.css";
import List from "./components/List";
import ListItem from "./components/ListItem";
import ListImg from "./components/ListImg";
import ListItemText from "./components/ListItemText";
import ListIcon from "./components/ListIcon";
import Bulbasaur from "../src/assets/bulbasaur.png";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Pokedex</h1>
        <input className="input" placeholder="Search your Pokemon..." />
      </header>
      <main className="pokeList">
        <List>
          <ListItem href="#">
            <ListImg src={Bulbasaur} alt="#"></ListImg>
            <ListItemText
              primary="Whiskey"
              secondary="Schluckspecht"
            ></ListItemText>
            <ListIcon src="" alt="#"></ListIcon>
          </ListItem>

          <ListItem href="#">
            <ListImg src="" alt="#"></ListImg>
            <ListItemText primary="Döner" secondary="Futtertier"></ListItemText>
            <ListIcon src="" alt="#"></ListIcon>
          </ListItem>
        </List>
      </main>
    </div>
  );
}

export default App;
