import express = require('express');

import {
	GameResult,
	ScoredPlayerResult,
	GenericScoredController
} from '../../../shared/shared';

export default class GenericScoredRoutes<T extends GenericScoredController<V, P>, V extends GameResult<P>, P extends ScoredPlayerResult> {

	private controller: T;
	private prefix: string;

	constructor(app: express, _cont: T, _prefix: string) {
		this.controller = _cont;
		this.prefix = _prefix;
		this.configureRoutes(app);
	}

	private configureRoutes(app: express) {
		app.get('/' + this.prefix + '/currentScores', (req: express.Request, res: express.Response) => {
			if (req.query.gameId !== undefined) {
				this.controller.getScore(req.query.gameId)
					.then(game => {
						res.status(200).send(game);
					})
					.catch(err => {
						console.error('Got an error attempting to get the current scores:\n' + req.query.gameId);
						res.status(500).send(err);
					});
			}
			else {
				console.error('No game id provided in request to currentScores!')
				res.status(400).send('gameId is a required parameter!');
			};
		});
	}

}