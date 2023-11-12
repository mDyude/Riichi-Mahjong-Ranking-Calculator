import FetchPlayerDetails from "./FetchPlayerDetails";
// UNFINISHED

// return a list of parsed data for all the players in a game
const ParseGameData = (games) => {
    const output = [];

    games.forEach((game) => {
        game.scores.forEach((score, index) => {
            const playerData = {
                playerName: FetchPlayerDetails(score.playerId).name, // Replace with actual logic to get player name
                direction: score.direction,
                score: score.score,
                pointsDiff: score.pointsDiff // Replace with actual logic to calculate points difference
            };
            output.push(playerData);
        });
    });

    return output;
};

export default ParseGameData;