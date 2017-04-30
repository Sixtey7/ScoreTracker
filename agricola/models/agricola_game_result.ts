import * as mongoose from 'mongoose';


import { 
	GameResult,
} from '../../shared/shared';

import {
	agricolaPlayerResultSchema,
	IAgricolaPlayerResultModel
} from './agricola_player_result';

interface IAgricolaGameResultModel extends GameResult<IAgricolaPlayerResultModel>, mongoose.Document{}

var agricolaGameResultSchema = new mongoose.Schema({
	gameDefId: String,
	date : { type: Date, default: Date.now },
	playerResults: [agricolaPlayerResultSchema],
	expansions: [String]
});

var AgricolaGameResult = mongoose.model<IGameResultModel>("AgricolaGameResult", agricolaGameResultSchema);

export {
	AgricolaGameResult,
	IAgricolaGameResultModel
};