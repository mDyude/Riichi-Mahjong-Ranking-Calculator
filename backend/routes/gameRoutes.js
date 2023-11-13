import express from 'express';
import { Game } from '../models/gameModel.js';
import CalcPointsDiff from '../utils/calcPointsDiff.js';

const router = express.Router();

// here when the game is being stored, it has already been sorted by score and direction
router.post('/', async (request, response) => {
    try {
        const { scores } = request.body;

        if (!request.body.scores) {
            return response.status(400).send({ message: 'Missing required fields' });
        }

        // If scores are provided, we must ensure they include playerIds and scores
        if (!request.body.scores.every(s => s.playerId && typeof s.score === 'number')) {
            return response.status(400).send({ message: 'Each score must have a playerId and a numeric score' });
        }

        // Sort scores by score and then by direction
        scores.sort((a, b) => {
            if (b.score === a.score) {
                return a.direction - b.direction; // Ascending order for direction
            }
            return b.score - a.score; // Descending order for score
        });
        // console.log("Sorted scores:", scores);

        // The winner is the first entry in the sorted array
        const winnerId = scores[0]._id;

        for (let i = 0; i < 4; i++) {
            scores[i].rankOfAGame = i + 1;
            scores[i].pointsDiff = CalcPointsDiff(i + 1, scores[i].score);
        }

        const newGame = new Game({
            scores,
            winner: winnerId,
            date: new Date() // Or rely on the default value set in schema
        });

        await newGame.save();

        response.status(201).json(newGame);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Server error occurred' });
    }
});

// get all the games
router.get('/', async (request, response) => {
    try {
        const games = await Game.find();
        response.status(200).json(games);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Server error occurred' });
    }
});

// get a single game by its gameId
router.get('/:gameNo', async (request, response) => {
    try {
        const gameNo = request.params.gameNo;
        const game = await Game.findOne({ gameNo });

        if (!game) {
            return response.status(404).send({ message: 'Game not found' });
        }

        response.status(200).json(game);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Server error occurred' });
    }
});

// PUT request to update a game by gameId
router.put('/:gameNo', async (request, response) => {
    const { gameNo } = request.params;
    // const { scores, winner } = request.body; // Include any other fields that can be updated

    try {
        // findOneAndUpdate({ }):
        // The curly braces { } denote the query object in which
        // you specify the conditions that the document must match to be deleted.
        const updatedGame = await Game.findOneAndUpdate(
            { gameNo },
            // { scores, winner }, // Include any other fields that can be updated
            request.body,
            { new: true } // This option returns the updated document
        );

        if (!updatedGame) {
            return response.status(404).send({ message: 'Game not found' });
        }

        response.status(200).json(updatedGame);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Server error occurred' });
    }
});

// DELETE request to remove a game by gameId
router.delete('/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const game = await Game.findById(id);

        if (!game) {
            return response.status(404).send({ message: "Game not found" });
        }

        await Game.findByIdAndDelete(id);
        response.status(200).send({ message: 'Game deleted successfully', gameNo: id });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Server error occurred' });
    }
});

export default router;