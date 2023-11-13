import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material";
import BackAppBar from "../components/BackAppBar";
import GameCard from "../components/GameCard";

const ShowPlayerGameHistory = () => {
  // useState({}) initialize the state to an empty object
  const [player, setPlayer] = useState({});
  // useState([]) initialize the state to an empty array
  const [PlayerGamesHistory, setGamesHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  // useParams reads the current URL parameters and returns an object of key/value pairs
  const { name } = useParams();
  const [playerIdNameMap, setPlayerIdNameMap] = useState({});

  // useEffect is a hook that lets you perform side effects in function components
  // here we use it to fetch data from the server
  // then we update the state with the response data
  useEffect(() => {
    const loadGameData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5555/players/${name}`
        );
        setPlayer(response.data.data);
        setGamesHistory(response.data.gamesHistory);

        // Extract unique player IDs
        const playerIds = new Set();
        response.data.gamesHistory.forEach((game) => {
          game.scores.forEach((score) => {
            playerIds.add(score.playerId);
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadGameData();
  }, [name]);

  const theme = createTheme({
    typography: {
      fontFamily: ["Nunito Sans", "sans-serif"].join(","),
    },
  });

  return (
    <div>
      <BackAppBar title="Player Info" />
      <div className="p-4 font-sans-serif Nunito Sans">
        <div className="flex">
          {loading ? (
            <CircularProgress />
          ) : (
            <div className="flex flex-col mx-auto">
              <div className="my-2">
                <span className="text-xl mr-4 text-gray-500">Name</span>
                <span>{player.name}</span>
              </div>
              <div className="my-2">
                <span className="text-xl mr-4 text-gray-500">Games Played</span>
                <span>{player.gamesPlayed}</span>
              </div>
              <div className="my-2">
                <span className="text-xl mr-4 text-gray-500">Points</span>
                <span>{Math.round(player.totalScore * 10) / 10}</span>
              </div>
              <div className="my-2">
                <span className="text-xl mr-4 text-gray-500">Average Rank</span>
                <span>{player.avgRank}</span>
              </div>
              <div className="my-2">
                <span className="text-xl mr-4 text-gray-500">Create Time</span>
                <span>{new Date(player.createdAt).toString()}</span>
              </div>
              <div className="my-2">
                <span className="text-xl mr-4 text-gray-500">
                  Last Update Time
                </span>
                <span>{new Date(player.updatedAt).toString()}</span>
              </div>

              <div className="my-2 flex flex-col">
                <span className="text-xl mr-4 text-gray-500">Games Played</span>
                {/* if there is a game */}
                <div className="flex-row">
                  {PlayerGamesHistory.length > 0 ? (
                    PlayerGamesHistory.slice(0).reverse().map((game, gameIndex) => (
                      <div key={gameIndex} className='py-2'>
                        <GameCard game={game} />
                      </div>
                    ))
                  ) : (
                    <p>No games history available.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowPlayerGameHistory;
