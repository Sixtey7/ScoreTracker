import * as mongoose from 'mongoose';

import {
	ScoredPlayerResult
} from '../../shared/shared';

class IAgricolaPlayerResult implements ScoredPlayerResult {
	playerId: string | number;
    fieldsNum: number;
    pastureNum: number;
    grainNum: number;
    vegNum: number;
    sheepNum: number;
    pigNum: number;
    cowNum: number;
    unusedNum: number;
    stableNum: number;
    clayNum: number;
    stoneNum: number;
    familyNum: number;
    cardNum: number;
    bonusNum: number;
    score: number;

    calculateScore(_other: ScoredPlayerResult) {
        //TODO: gotta fix this
        this.score = _other.score;
    }
};

interface IAgricolaPlayerResultModel extends IAgricolaPlayerResult, mongoose.Document{};
var agricolaPlayerResultSchema = new mongoose.Schema({
	playerId: String,
	fieldsNum: Number,
    pastureNum: Number,
    grainNum: Number,
    vegNum: Number,
    sheepNum: Number,
    pigNum: Number,
    cowNum: Number,
    unusedNum: Number,
    stableNum: Number,
    clayNum: Number,
    stoneNum: Number,
    familyNum: Number,
    cardNum: Number,
    bonusNum: Number,
    score: Number
});

var AgricolaPlayerResult = mongoose.model<IAgricolaPlayerResultModel>("AgricolaPlayerResult", agricolaPlayerResultSchema);

export {
	IAgricolaPlayerResultModel,
	agricolaPlayerResultSchema,
	AgricolaPlayerResult
}