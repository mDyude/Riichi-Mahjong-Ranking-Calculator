import React, { useState } from "react";
import BackButton from "../components/BackButton";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

const DeletePlayer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeletePlayer = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/players/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Chack console");
        console.log(error);
      });
  };

  return (
    <div className="p-4 font-sans-serif Nunito Sans ">
      <BackButton />
      {loading ? <CircularProgress /> : ""}
      <div className="flex flex-col items-center rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are You Sure You want to delete this player?
        </h3>

        <div className='my-4'>
          <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDeletePlayer}>
            Yes, Delete it.
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlayer;
