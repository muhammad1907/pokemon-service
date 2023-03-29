const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = response.data;
        const randomNumber = Math.floor(Math.random() * 100) + 1;

        if(randomNumber % 2 === 0) {
            return res.json({
                is_success : 'success',
                data: pokemon
            });
        } else {
            return res.json({
                is_success : 'failed',
                data: pokemon
            });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;