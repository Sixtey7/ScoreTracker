import {
	GenericController,
	GameResult
} from '../../shared/shared';

import {
	IAgricolaGameResultModel,
	IAgricolaPlayerResultModel,
	AgricolaGameResult,
} from '../agricola';

export default class AgricolaController extends GenericController<IAgricolaGameResultModel, IAgricolaPlayerResultModel> {

	constructor() {
		super(AgricolaGameResult);
	};

};
