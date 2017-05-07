import {
	GenericScoredController,
	GameResult
} from '../../shared/shared';

import {
	IAgricolaGameResultModel,
	IAgricolaPlayerResultModel,
	AgricolaGameResult,
} from '../agricola';

export default class AgricolaController extends GenericScoredController<IAgricolaGameResultModel, IAgricolaPlayerResultModel> {

	constructor() {
		super(AgricolaGameResult);
	};

	//TODO: Fix this
	public calculateScore(firstPlayer: IAgricolaPlayerResultModel, secondPlayer: IAgricolaPlayerResultModel) : IAgricolaPlayerResultModel {
		firstPlayer.score = secondPlayer.score;
		return firstPlayer;
	}

};
