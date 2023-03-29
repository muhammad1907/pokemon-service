const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Pokemon } = require('../models');


router.delete('/:id', async (req, res) => {

  const id  = req.params.id;
  try {
    // Call an external API to get a prime number
    const response = generatePrimeNumber();

    const primeNumber = response;

    // Check if the prime number is prime using a helper function
    
    const isPrime = isNumberPrime(primeNumber);

    // Call the Pokemon API to get information about the released Pokemon

    const pokemon = await Pokemon.findByPk(id);

    if (!pokemon) {
      return res.status(404).json({ status: 'error', message: 'pokemon not found'});
    }

    console.log(pokemon.pokemon_id)
    const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_id}`);
    const pokemonName = pokemonResponse.data.name;

    if (isPrime) {
      
      await pokemon.destroy();
      
      res.json({ 'status_catch':'success', message: `Pokemon with ID ${pokemon.pokemon_id} and name ${pokemonName} has been released.`, primeNumber: primeNumber });
    } else {
      res.status(400).json({ 'status_catch':'fail', message: `Pokemon with ID ${pokemon.pokemon_id} and name ${pokemonName} cannot be released because its ID does not match the prime number ${primeNumber}.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

function generatePrimeNumber() {
  return Math.floor(Math.random() * (30 - 1 + 1) + 1);
}

function isNumberPrime(num) {
  if (num < 2) {
    return false;
  }
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

module.exports = router;