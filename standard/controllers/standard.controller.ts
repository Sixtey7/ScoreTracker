import {
	GenericController,
	IStandardGameResultModel,
	IPlayerResultModel,
	StandardGameResult,
	GameResult
} from '../../shared/shared';

export default class StandardController extends GenericController<IStandardGameResultModel, IPlayerResultModel> {

	constructor() {
		super(StandardGameResult);
	};

};
