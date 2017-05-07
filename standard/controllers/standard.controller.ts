import {
	GenericScoredController,
	GameResult
} from '../../shared/shared';

import {
	IStandardGameResultModel,
	IStandardPlayerResultModel,
	StandardGameResult,
} from '../standard';

export default class StandardController extends GenericScoredController<IStandardGameResultModel, IStandardPlayerResultModel> {

	constructor() {
		super(StandardGameResult);
	};

	public calculateScore(firstPlayer: IStandardPlayerResultModel, secondPlayer: IStandardPlayerResultModel) : IStandardPlayerResultModel {
		firstPlayer.score = secondPlayer.score;
		return firstPlayer;
	}


};
