import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  Add,
  PersonAdd,
  Delete,
  CollectionsBookmark,
} from "@mui/icons-material";
import PlayersTable from "../components/home/PlayersTable";
import PlayerCard from "../components/home/PlayerCard";
import FloatingButton from "../components/FloatingButton";

import { set } from "mongoose";
import "./Home.css";

const Home = () => {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("http://localhost:5555/players"),
      axios.get("http://localhost:5555/games"),
    ])
      .then(([playersResponse, gamesResponse]) => {
        setPlayers(playersResponse.data.data);
        setGames(gamesResponse.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4 font-nunito-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">680 & 499 雀庄排名</h1>
        <Link to="/games/all">
          <Button variant="contained" startIcon={<CollectionsBookmark />}>
            History Games
          </Button>
        </Link>
      </div>
      {loading ? <CircularProgress /> : <PlayersTable players={players} />}
      <div>
        <FloatingButton style={{ position: "fixed", bottom: 50, right: 30 }} />
      </div>
    </div>
  );
};

export default Home;
