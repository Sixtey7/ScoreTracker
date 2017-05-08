import express = require('express');

import {
	GameResult,
	ScoredPlayerResult,
	GenericScoredController,
	GenericRoutes
} from '../../../shared/shared';

export default class GenericScoredRoutes<T extends GenericScoredController<V, P>, V extends GameResult<P>, P extends ScoredPlayerResult> extends GenericRoutes<T, V, P> {
/*
	private controller: T;
	private prefix: string;
*/
	constructor(app: express, _cont: T, _prefix: string) {
		super(app, _cont, _prefix);
		//this.controller = _cont;
		//this.prefix = _prefix;
		this.configureScoredRoutes(app);
	}

	private configureScoredRoutes(app: express) {
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

		app.post('/' + this.prefix + '/save', (req: express.Request, res: express.Response) => {
			if (req.query.gameId !== undefined) {
				let newPlayerArray: P[] = req.body;
				if (newPlayerArray) {
					console.log('parsed the following:\n' + JSON.stringify(newPlayerArray));

					this.controller.saveGame(req.query.gameId, newPlayerArray)
						.then(response => {
							res.status(200).send(response);
						})
						.catch(err => {
							console.error('Got an error attempting to save a game!\n' + err);
							res.status(500).send(err);
						})
				}
				else {
					console.error('body of message was not parsable into player array!');
					res.status(400).send('Could not parse body into player array');
				}
			}
			else {
				console.error('No gameId found in request to save game');
				res.status(400).send('gameId is a required parameter!');
			}
		});
	};

}