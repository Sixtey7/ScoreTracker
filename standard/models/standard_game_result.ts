import * as mongoose from 'mongoose';


import { 
	GameResult,
} from '../../shared/shared';

import {
	standardPlayerResultSchema,
	IStandardPlayerResultModel
} from './standard_player_result';

interface IStandardGameResultModel extends GameResult<IStandardPlayerResultModel>, mongoose.Document{}

var standardGameResultSchema = new mongoose.Schema({
	gameDefId: String,
	date : { type: Date, default: Date.now },
	playerResults: [standardPlayerResultSchema],
	expansions: [String]
});

var StandardGameResult = mongoose.model<IGameResultModel>("GameResult", standardGameResultSchema);

export {
	StandardGameResult,
	IStandardGameResultModel
};