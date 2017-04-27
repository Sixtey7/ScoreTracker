import * as mongoose from 'mongoose';


import { 
	GameResult
} from '../shared';

import { playerResultSchema, IPlayerResultModel } from './player_result';

interface IStandardGameResultModel extends GameResult<IPlayerResultModel>, mongoose.Document{}

var standardGameResultSchema = new mongoose.Schema({
	gameDefId: String,
	date : { type: Date, default: Date.now },
	playerResults: [playerResultSchema],
	expansions: [String]
});

var StandardGameResult = mongoose.model<IGameResultModel>("GameResult", standardGameResultSchema);

export {
	StandardGameResult,
	IStandardGameResultModel
};