import mongoose from "mongoose";
import { Player } from "./playerModel.js";

const gameSchema = new mongoose.Schema(
    {
        gameNo: {
            type: Number,
        },
        scores:[{
            playerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
                required: true,
            },
            score: {
                type: Number,
                required: true,
            },
            direction: {
                type: Number,
                required: true,
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

// Pre-save hook to auto-increment gameNo
gameSchema.pre('save', async function(next) {
    if (this.isNew) {
      const lastGame = await this.constructor.findOne().sort({ gameNo: -1 });
      this.gameNo = lastGame ? lastGame.gameNo + 1 : 1;
    }
    next();
  });
  
export const Game = mongoose.model('game', gameSchema);