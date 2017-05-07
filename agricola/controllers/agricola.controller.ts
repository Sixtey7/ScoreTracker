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

	public calculateScore(firstPlayer: IAgricolaPlayerResultModel, secondPlayer: IAgricolaPlayerResultModel) : IAgricolaPlayerResultModel {
		firstPlayer.bonusNum = secondPlayer.bonusNum;
        firstPlayer.cardNum = secondPlayer.cardNum;
        firstPlayer.clayNum = secondPlayer.clayNum;
        firstPlayer.cowNum = secondPlayer.cowNum;
        firstPlayer.familyNum = secondPlayer.familyNum;
        firstPlayer.fieldsNum = secondPlayer.fieldsNum;
        firstPlayer.grainNum = secondPlayer.grainNum;
        firstPlayer.pastureNum = secondPlayer.pastureNum;
        firstPlayer.pigNum = secondPlayer.pigNum;
        firstPlayer.sheepNum = secondPlayer.sheepNum;
        firstPlayer.stableNum = secondPlayer.stableNum;
        firstPlayer.stoneNum = secondPlayer.stoneNum;
        firstPlayer.vegNum = secondPlayer.vegNum;
        firstPlayer.score = secondPlayer.score;

		return firstPlayer;
	}

};
