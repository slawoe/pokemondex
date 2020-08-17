import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemon } from "../api/Pokemons";
import LoadingScreen from "../components/LoadingScreen";
import "./Pokemon.css";

function Pokemon() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const fetchedPokemon = await fetchPokemon(name);
        setPokemon(fetchedPokemon);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    fetchData();
  }, [name]);

  if (error) {
    return <div>ERROR!!!</div>;
  }
  if (loading || !pokemon) {
    return <LoadingScreen />;
  }
  return (
    <div>
      <div>ID: {pokemon.id}</div>
      <div>Name: {pokemon.name}</div>
      <div>
        IMG: <img src={pokemon.imgSrc} alt={pokemon.name} />
      </div>
    </div>
  );
}

export default Pokemon;
