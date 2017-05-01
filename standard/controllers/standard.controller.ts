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

};
