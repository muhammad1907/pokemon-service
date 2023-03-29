const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Pokemon } = require('../models');


router.get('/getAll/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const pokemons = await Pokemon.findAll({ where: { user_id: userId } });

    const pokemonList = await Promise.all(
      pokemons.map(async (pokemon) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_id}`);
        const pokemonData = response.data;

        return {
          id: pokemon.id,
          name: pokemonData.name,
          nickname: pokemon.pokemon_name,
          image: pokemonData.sprites.front_default
        };
      })
    );

    res.json(pokemonList);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// REST API to rename Pokemon
router.put('/rename-pokemon/:id', async (req, res) => {
    const id = req.params.id;
    // const nickname = req.params.nickname;
  
    try {
      // Get the Fibonacci number for the given Pokemon ID
    

      const pokemon = await Pokemon.findByPk(id);

      if (!pokemon) {
        return res.status(404).json({ status: 'error', message: 'pokemon not found'});
      }

      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_id}`);
      const pokemonData = response.data;
      const fibonacciNumber = fibonacci(pokemon.changes);

      let count = pokemon.changes;
      if (pokemon.changes == 1) {
        count = 2;
      } else if (pokemon.changes == 2) {
        count++;
      } else {
        count++;
      }

      // Combine the nickname and Fibonacci number to create the new nickname
      const newNickname = `${pokemonData.name}-${fibonacciNumber}`;
  
      await pokemon.update({
        pokemon_name: newNickname,
        changes: count
      });

      return res.json({
        is_success : 'success rename pokemon',
        data: pokemon
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
});
  
  // Function to calculate the nth Fibonacci number
function fibonacci(n) {
    if (n <= 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
       return fibonacci(n - 1) + fibonacci(n - 2);
    }
}


router.get('/', async (req, res) => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
      const pokemonList = response.data.results.map(pokemon => ({
        name: pokemon.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)}.png`
      }));

      return res.json({
        status : 'success',
        message : 'No error',
        data: pokemonList
      });

    } catch (error) {
      console.error(error);
      
      return res.json({
        status : 'failed',
        message : error,
        data: []
      });

    }
  });

  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const types = pokemonResponse.data.types.map(type => type.type.name);
      const moves = pokemonResponse.data.abilities.map(ability => ability.ability.name);
      const pokemonDetail = {
        name: pokemonResponse.data.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        types,
        moves
      };
      return res.json({
        status : 'success',
        message : 'No error',
        data: pokemonDetail
      });
    } catch (error) {
      console.error(error);
      return res.json({
        status : 'failed',
        message : error,
      });
    }
  });
  
  module.exports = router;
