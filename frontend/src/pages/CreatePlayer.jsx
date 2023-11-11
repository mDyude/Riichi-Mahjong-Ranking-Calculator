import React, { useState } from "react";
import BackButton from "../components/BackButton";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material";

const CreatePlayer = () => {
  const [name, setName] = useState("");
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [avgRank, setAvgRank] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSavePlayer = () => {
    const data = {
      name,
      gamesPlayed,
      totalScore,
    };
    setLoading(true);

    // the data being sent is contained in the data variable.
    axios
      .post("http://localhost:5555/players", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const theme = createTheme({
    typography: {
      fontFamily: ["Nunito Sans"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="p-4">
        <BackButton />
        <h1 className="font-sans-serif Nunito Sans my-4 flex justify-center items-center">
          Create Player
        </h1>
        {loading ? <CircularProgress /> : ""}
        <div className="flex flex-col border-2 rounded-xl max-w-xl p-4 mx-auto">
          <div className="my-4">
            <TextField
              label="Player Name"
              variant="outlined"
              value={name}
              // set event.target.value to name
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <TextField
              label="Games Played"
              variant="outlined"
              type="number"
              value={gamesPlayed}
              // set event.target.value to name
              onChange={(e) => setGamesPlayed(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <TextField
              label="Scores"
              variant="outlined"
              type="number"
              value={totalScore}
              // set event.target.value to name
              onChange={(e) => setTotalScore(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4 self-end">
            <Button variant="contained" onClick={handleSavePlayer}>
              Save Player
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CreatePlayer;
