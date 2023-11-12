// get player data by id
import axios from "axios";

const FetchPlayerDetails = async (playerId) => {
    try {
      const response = await axios.get(
        `http://localhost:5555/players/${playerId}`
      );
      return response.data; // this will be the player details
    } catch (error) {
      console.error("Error fetching player details:", error);
      return null;
    }
  };

export default FetchPlayerDetails;