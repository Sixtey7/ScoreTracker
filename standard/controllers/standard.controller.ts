import {
	GenericController,
	IGameResultModel,
	GameResult
} from '../../shared/shared';

export default class StandardController extends GenericController<IGameResultModel> {

	constructor() {
		super(GameResult);
	};

};
