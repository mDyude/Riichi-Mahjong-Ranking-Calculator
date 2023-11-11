import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { Add, PersonAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";

const FloatingButton = ({ style }) => {
  return (
    // :not() represents elements that do not match a list of selectors, so '& > :not(style)':
    //  means that it applies to all children elements that have no 'style' attribute.
    // If you add style to the first Paper component, e.g., it will be excluded from this CSS rule.
    <Box sx={{ "& > :not(style)": { m: 1 } }} style={style}>
      <Link to="/games/create">
        <Fab color="primary" aria-label="add">
          <Add />
        </Fab>
      </Link>
      <Link to="/players/create">
        <Fab color="secondary" aria-label="edit">
          <PersonAdd />
        </Fab>
      </Link>
    </Box>
  );
};

export default FloatingButton;
