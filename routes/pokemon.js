const express = require('express');
const axios = require('axios');
const router = express.Router();

// REST API to rename Pokemon
router.get('/rename-pokemon/:id/:nickname', async (req, res) => {
    const pokemonId = req.params.id;
    const nickname = req.params.nickname;
  
    try {
      // Get the Fibonacci number for the given Pokemon ID
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const pokemonData = response.data;
      const fibonacciNumber = fibonacci(pokemonData.id);
  
      // Combine the nickname and Fibonacci number to create the new nickname
      const newNickname = `${nickname}-${fibonacciNumber}`;
  
      res.json({ pokemonData });
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
