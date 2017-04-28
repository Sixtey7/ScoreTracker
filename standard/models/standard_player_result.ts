import * as mongoose from 'mongoose';

import {
	PlayerResult
} from '../../shared/shared';

interface IStandardPlayerResult extends PlayerResult {
	score: number;
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