import * as mongoose from 'mongoose';

import {
	ScoredPlayerResult
} from '../../shared/shared';

class IStandardPlayerResult implements ScoredPlayerResult {
	playerId: string | number;
	score: number;

	calculateScore(_other: ScoredPlayerResult) {
		this.score = _other.score;
	}
};

interface IStandardPlayerResultModel extends IStandardPlayerResult, mongoose.Document{};
var standardPlayerResultSchema = new mongoose.Schema({
	playerId: String,
	score: Number
});

var StandardPlayerResult = mongoose.model<IStandardPlayerResultModel>("PlayerResult", standardPlayerResultSchema);

export {
	IStandardPlayerResultModel,
	standardPlayerResultSchema,
	StandardPlayerResult
}