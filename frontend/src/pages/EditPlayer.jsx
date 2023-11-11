import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { set } from "mongoose";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';

const EditPlayer = () => {
  const [name, setName] = useState("");
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // the variable name have to match the variable name in the route path in App.jsx
  const { id } = useParams();

  // useParams reads the current URL parameters and returns an object of key/value pairs
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/players/${id}`)
      .then((response) => {
        setName(response.data.data.name);
        setGamesPlayed(response.data.data.gamesPlayed);
        setTotalScore(response.data.data.totalScore);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditPlayer = () => {
    const data = {
      name,
      gamesPlayed,
      totalScore,
    };
    setLoading(true);

    axios
      .put(`http://localhost:5555/players/${id}`, data)
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
          Edit Player {name}
        </h1>
        {loading ? <CircularProgress /> : ""}
        <div className="flex flex-col border-2 rounded-xl max-w-xl p-4 mx-auto">
          <div className="my-4">
            <TextField
              label="Player Name"
              type="text"
              value={name}
              // set event.target.value to name
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <TextField
              label="Games Played"
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
              type="number"
              value={totalScore}
              // set event.target.value to name
              onChange={(e) => setTotalScore(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4 self-end">
            <Button variant="contained" onClick={handleEditPlayer}>
              Save Player
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default EditPlayer;
