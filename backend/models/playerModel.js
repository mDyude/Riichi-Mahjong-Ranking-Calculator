import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        gamesPlayed: {
            type: Number,
            default: 0,
        },
        totalScore: {
            type: Number,
            default: 0,
        },
        rank: {
            type: Number,
            default: 0,
        },
        avgRank:{
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

export const Player = mongoose.model('player', playerSchema);