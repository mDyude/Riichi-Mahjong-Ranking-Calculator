import mongoose from "mongoose";
import { Player } from "./playerModel.js";

const gameSchema = new mongoose.Schema(
    {
        gameNo: {
            type: Number,
        },
        scores: [{
            playerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
                required: true,
            },
            // the player rank in the current game. from 1 to 4
            rankOfAGame: {
                type: Number,
            },
            score: {
                type: Number,
                required: true,
            },
            direction: {
                type: Number,
                required: true,
            },
            pointsDiff: {
                type: Number,
            }
        }],
        winner: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
)

// Pre-save hook to 
gameSchema.pre('save', async function (next) {
    // const playerIds = this.scores.map(score => score.playerId.toString());
    // const uniquePlayerIds = new Set(playerIds);
    // // check duplicate players in a game
    // if (uniquePlayerIds.size !== playerIds.length) {
    //     // If there are duplicates, pass an error to the next() function
    //     const err = new Error('Duplicate players detected. Each player must be unique.');
    //     next(err);
    // }
    // auto-increment gameNo
    if (this.isNew) {
        const lastGame = await this.constructor.findOne().sort({ gameNo: -1 });
        this.gameNo = lastGame ? lastGame.gameNo + 1 : 1;
    }
    next();
});

export const Game = mongoose.model('game', gameSchema);