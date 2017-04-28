import {
	GenericController,
	GameResult
} from '../../shared/shared';

import {
	IStandardGameResultModel,
	IStandardPlayerResultModel,
	StandardGameResult,
} from '../standard';

export default class StandardController extends GenericController<IStandardGameResultModel, IStandardPlayerResultModel> {

	constructor() {
		super(StandardGameResult);
	};

};
