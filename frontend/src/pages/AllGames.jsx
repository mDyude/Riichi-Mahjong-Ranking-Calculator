import React, { useEffect, useState } from "react";
import { Game } from "../../../backend/models/gameModel";
import axios from "axios";
import BackButton from "../components/BackButton";
import CircularProgress from "@mui/material/CircularProgress";
import GameCard from "../components/GameCard";
import BackAppBar from "../components/BackAppBar";
import { set } from "mongoose";
import FetchPlayerDetails from "../components/functions/FetchPlayerDetails";
import MapDirection from "../components/functions/MapDirection";
import { DateTime } from "luxon";

const AllGames = () => {
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5555/games")
      .then(async (response) => {
        // After fetching the game data, we iterate over each game using Promise.all and map. This allows for asynchronous operations within the map function.
        // For each game, we again use Promise.all and map to iterate over the scores array and fetch player details asynchronously for each score item.
        // FetchPlayerDetails is called for each player ID, and the result is used to construct a score object with the player's name, score, and direction.
        // Finally, we construct an object for each game with all necessary details and update the state with this array of games.
        const gamesData = response.data;
        console.log("Response:", response.data);

        setAllGames(gamesData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("Updated allGames:", allGames);
  }, [allGames]); // This effect runs whenever allGames changes

  return (
    <div className='px-4'>
      <BackAppBar title="All Games" />
      <div className='font-sans-serif Nunito Sans py-2'>
        {allGames.slice(0).reverse().map((game) => {
          return (
          <div className='py-2' key={game.id}>
            <GameCard game={game} />
          </div>)
        })}
      </div>
    </div>
  );
};

export default AllGames;
