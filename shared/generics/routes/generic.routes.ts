import express = require('express');

import {
	GameResult,
	PlayerResult,
	GenericController
} from '../../../shared/shared';

export default class GenericRoutes<T extends GenericController<V, P>, V extends GameResult<P>, P extends PlayerResult> {
	
	protected controller: T;
	protected prefix: string;

	constructor(app: express, _cont: T, _prefix: string) {
		this.controller = _cont;
		this.prefix = _prefix;
		this.configureRoutes(app);
	}

	private configureRoutes(app: express) {
		app.get('/' + this.prefix + '/hello', (req: express.Request, res: express.Response) => {
			res.status(200).send('Hello World!');
		});

		app.put('/' + this.prefix + '/begin', (req: express.Request, res:express.Response) => {
			let bodyGame: V = req.body;

			if (bodyGame) {
				this.controller.startGame(bodyGame)
					.then(response => {
						res.status(200).send(response._id);
					})
					.catch(err => {
						console.error('got an error attempting to start a game\n' + err);
						res.status(500).send(err);
					})
			}
			else {
				console.error('no game was provided in begin');
				res.status(400).send('a game is required in the body of the request!');
			}
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