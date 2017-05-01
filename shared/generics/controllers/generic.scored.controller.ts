import GenericController from './generic.controller';

import {
	GameResult,
	ScoredPlayerResult
} from '../../../shared/shared';

export default class GenericScoredController<G extends GameResult<P>, P extends ScoredPlayerResult> extends GenericController<G, P> {

	/**
	*
	* Constructor to set the model
	* 
	**/
	constructor(_model: any) {
		super(_model);
	};

}

