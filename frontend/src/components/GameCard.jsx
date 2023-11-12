import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FetchPlayerDetails from "./functions/FetchPlayerDetails";
import MapDirection from "./functions/MapDirection";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "rank", headerName: "Rank", width: 90 },
  {
    field: "direction",
    headerName: "Wind",
    width: 90,
  },
  {
    field: "playerName",
    headerName: "Name",
    width: 150,
  },
  {
    field: "score",
    headerName: "Score",
    type: "number",
    width: 110,
  },
  {
    field: "pointsDiff",
    headerName: "Points Difference",
    type: "number",
    width: 110,
  },
];

const GameCard = ({ game }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Game {game.gameNo}
        </Typography>
        <Typography variant="h5" component="div">
          {game.scores.map((player, index) => (
            <div key={scoreIndex} className="p-4">
              <p>Player Name: {FetchPlayerDetails(player._id)}</p>
              <p>Points: {player.score}</p>
              <p>Direction: {MapDirection(player.direction)}</p>
            </div>
          ))}
          )
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default GameCard;
