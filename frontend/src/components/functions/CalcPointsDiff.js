// function for calculating the points difference of one player in one game

const originalCredit = 30000;
const firstPlace = 20;
const secondPlace = 10;
const thirdPlace = 0;
const lastPlace = -10;

const CalcPointsDiff = (rank, score) => {
    if (rank === 1) {
        return firstPlace + (score - originalCredit) / 1000;
    }
    if (rank === 2) {
        return secondPlace + (score - originalCredit) / 1000;
    }
    if (rank === 3) {
        return thirdPlace + (score - originalCredit) / 1000;
    }
    if (rank === 4) {
        return lastPlace + (score - originalCredit) / 1000;
    }
}

export default CalcPointsDiff