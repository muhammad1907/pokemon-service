const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Pokemon } = require('../models');

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = response.data;
        const randomNumber = Math.floor(Math.random() * 100) + 1;

        if(randomNumber % 2 === 0) {

            const data = {
                user_id: req.body.user_id,
                pokemon_id: id,
                pokemon_name: pokemon.name,
                changes: 1
            };
            
            const createdUser = await Pokemon.create(data);

            return res.json({
                is_success : 'success catch a pokemon',
                data: pokemon
            });
        } else {
            return res.json({
                is_success : 'failed catch a pokmeon',
                data: pokemon
            });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;