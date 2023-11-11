import express from "express";
import { Game } from "../models/gameModel.js";
import { Player } from "../models/playerModel.js";

const router = express.Router();

// route for saving a new player
router.post("/", async (request, response) => {
  try {
    if (!request.body.name) {
      return response.status(400).send({
        message: "required field(s) missing",
      });
    }
    const newPlayer = {
      // playerId: request.body.playerId,
      name: request.body.name,
      gamesPlayed: request.body.gamesPlayed,
      totalScore: request.body.totalScore,
    };
    const player = await Player.create(newPlayer);

    // saving the new player document to the database.
    // The await keyword is used to pause the execution of the function until the Promise is resolved.
    // If the document is successfully saved, the save() method will return the saved document.
    return response.status(201).send(player);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ error: error });
  }
});

// get all the players
router.get("/", async (request, response) => {
  try {
    // fetch all documents from the 'Player' collection in the database.
    const players = await Player.find().sort({ totalScore: -1 });

    // adding the rank field to each player document
    // the rank is the index of the player in the array + 1
    // toObject() converts the document to a plain JavaScript object
    const rankedPlayers = players.map((player, index) => ({
      ...player.toObject(),
      rank: index + 1
    }));

    // sending the response back to the client
    return response.status(200).json({
      players_count: rankedPlayers.length,
      data: rankedPlayers,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ error: error });
  }
});

// Endpoint to get all games for a specific player by name
// the ":" indicates a URL parameter
// the req comes from the client
router.get("/:id", async (req, res) => {
  try {
    // Get the player name from the request
    const {id} = req.params;
    // Find the player by name (assuming 'name' is a unique field in your Player model)
    
    // const player = await Player.findOne({ name: playerName });
    const player = await Player.findById(id);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Now find all games associated with this player
    // This assumes you have a reference to the player in your Game model
    const gamesHistory = await Game.find({ "scores.playerId": player._id });

    return res.status(200).json({
      data: player, gamesHistory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching player games" });
  }
});

// PUT request to update a player by name
router.put("/:id", async (request, response) => {
  const { id } = request.params;
  // const { name, totalScore } = request.body; // Include any other fields that can be updated

  try {
    // await is necessary because findByIdAndUpdate is an asynchronous operation
    // that returns a Promise
    // The await keyword can only be used inside an async function.
    const updatedPlayer = await Player.findByIdAndUpdate(
      id, request.body, // Include any other fields that can be updated
      { new: true } // This option returns the updated document
    );

    if (!updatedPlayer) {
      return response.status(404).send({ message: "Player not found" });
    }

    response.status(200).json(updatedPlayer);
    // return response.status(200).send({message: 'Player updated successfully.'});
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Server error occurred" });
  }
});

// DELETE request to remove a player by id
router.delete("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    // First, find the player by name to get the ID
    const player = await Player.findById(id);

    if (!player) {
      return response.status(404).send({ message: "Player not found" });
    }

    await Player.findByIdAndDelete(id);

    response
      .status(200)
      .send({ message: "Player deleted successfully", name: player.name });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Server error occurred" });
  }
});

export default router;
