import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, Menu, ThemeProvider } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:5555/players");
    return response.data.data.map((player) => ({
      name: player.name,
      id: player._id,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of an error
  }
};

const CreateGame = () => {
  const [eastName, setEastName] = useState("");
  const [southName, setSouthName] = useState("");
  const [westName, setWestName] = useState("");
  const [northName, setNorthName] = useState("");

  const [eastScore, setEastScore] = useState(0);
  const [southScore, setSouthScore] = useState(0);
  const [westScore, setWestScore] = useState(0);
  const [northScore, setNorthScore] = useState(0);
  const [players, setPlayers] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData().then((data) => {
      setPlayers(data);
    });
  }, []);

  console.log(players);
  const theme = createTheme({
    typography: {
      fontFamily: ["Nunito Sans"].join(","),
    },
  });

  const handleSaveGame = () => {
    const data = {
      scores: [
        { playerId: eastName, score: eastScore, direction: 0 },
        { playerId: southName, score: southScore, direction: 1 },
        { playerId: westName, score: westScore, direction: 2 },
        { playerId: northName, score: northScore, direction: 3 },
      ],
    };
    setLoading(true);

    // the data being sent is contained in the data variable.
    axios
      .post("http://localhost:5555/games", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="p-4">
        <BackButton />
        <h1 className="font-sans-serif Nunito Sans my-4 flex justify-center items-center">
          Create Game
        </h1>
        {loading ? <CircularProgress /> : ""}
        <div className="flex flex-col border-2 rounded-xl max-w-xl p-4 mx-auto">
          <div className="my-4">
            <TextField
              id="select-player-east"
              select
              label="东"
              value={eastName}
              // set event.target.value to name
              onChange={(e) => setEastName(e.target.value)}
              className="border-2 px-4 py-2 w-full"
            >
              {players.map((player) => (
                <MenuItem key={player.id} value={player.id}>
                  {player.name}
                </MenuItem>
              ))}
            </TextField>
            <div className="my-4">
              <TextField
                label="Score for EAST"
                variant="outlined"
                type="number"
                value={eastScore}
                // set event.target.value to name
                onChange={(e) => setEastScore(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <div className="my-4">
            <TextField
              id="select-player-south"
              select
              label="南"
              value={southName}
              // set event.target.value to name
              onChange={(e) => setSouthName(e.target.value)}
              className="border-2 px-4 py-2 w-full"
            >
              {players.map((player) => (
                <MenuItem key={player.id} value={player.id}>
                  {player.name}
                </MenuItem>
              ))}
            </TextField>
            <div className="my-4">
              <TextField
                label="Score for SOUTH"
                variant="outlined"
                type="number"
                value={southScore}
                // set event.target.value to name
                onChange={(e) => setSouthScore(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <div className="my-4">
            <TextField
              id="select-player-west"
              select
              label="西"
              value={westName}
              // set event.target.value to name
              onChange={(e) => setWestName(e.target.value)}
              className="border-2 px-4 py-2 w-full"
            >
              {players.map((player) => (
                <MenuItem key={player.id} value={player.id}>
                  {player.name}
                </MenuItem>
              ))}
            </TextField>
            <div className="my-4">
              <TextField
                label="Score for WEST"
                variant="outlined"
                type="number"
                value={westScore}
                // set event.target.value to name
                onChange={(e) => setWestScore(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <div className="my-4">
            <TextField
              id="select-player-north"
              select
              label="北"
              value={northName}
              // set event.target.value to name
              onChange={(e) => setNorthName(e.target.value)}
              className="border-2 px-4 py-2 w-full"
            >
              {players.map((player) => (
                <MenuItem key={player.id} value={player.id}>
                  {player.name}
                </MenuItem>
              ))}
            </TextField>
            <div className="my-4">
              <TextField
                label="Score for NORTH"
                variant="outlined"
                type="number"
                value={northScore}
                // set event.target.value to name
                onChange={(e) => setNorthScore(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <div className="my-4 self-end">
            <Button variant="contained" onClick={handleSaveGame}>
              Save Game
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CreateGame;
