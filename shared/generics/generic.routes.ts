import express = require('express');

import GenericController from './generic.controller';

import {
	GameResult,
	IPlayerResultModel
} from '../../shared/shared';

export default class GenericRoutes<T extends GenericController<V, P>, V extends GameResult<P>, P extends IPlayerResultModel> {
	
	private controller: T;
	private prefix: string;

	constructor(app: express, _cont: T, _prefix: string) {
		this.controller = _cont;
		this.prefix = _prefix;
		this.configureRoutes(app);
	}

	private configureRoutes(app: express) {
		app.get('/' + this.prefix + '/hello', (req: express.Request, res: express.Response) => {
			res.status(200).send('Hello World!');
		});

		app.get('/' + this.prefix + '/getAll', (req: express.Request, res: express.Response) => {
			return this.controller.getAll()
				.then(response => {
					res.status(200).send(response);
				})
				.catch(err => {
					res.status(500).send(err);
				});
		});

		app.put('/' + this.prefix + '/addPlayer', (req: express.Request, res: express.Response) => {
			console.log('Adding a player!');
			if (req.query.gameId !== undefined) {
				if (req.query.playerName !== undefined) {
					this.controller.addPlayer(req.query.gameId, req.query.playerName)
						.then(newPlayer => {
							console.log('Player Added: ' + JSON.stringify(newPlayer));
							res.status(200).send(newPlayer);
						})
						.catch(err => {
							console.error('Got an error attempting to add a new player to game (' + req.query.gameId + ')\n' + err);
							res.status(500).send(err);
						});
				}
				else {
					res.status(400).send('playerName is a required parameter!');
				}
			}
			else {
				res.status(400).send('gameId is a required parameter');
			}
		});
	};
};