import React from "react";
import "./App.css";
import List from "./components/List";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Pokedex</h1>
        <input className="input" placeholder="Search your Pokemon..." />
      </header>
      <main className="pokeList">
        <List>Lecko mio</List>
        {/* <List>
          <ListItem href="#">
            <ListImg src="">
              <ListItemText primary="Bulbasaur" secondary="JavaScript"></ListItemText>
          </ListItem>
        </List> */}
      </main>
    </div>
  );
}

export default App;
