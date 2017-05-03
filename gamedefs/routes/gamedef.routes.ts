import express = require('express');

import {
	IGameDefModel,
	IGameDefExpansionModel,
	ScoringType
} from '../../shared/shared';

import GameDefController from '../controllers/gamedef.controller';

export default class GameDefRoutes {

	private prefix = 'gamedefs';
	private controller: GameDefController;
	constructor(app: express) {
		this.controller = new GameDefController();

		this.configureRoutes(app);

	}

	private configureRoutes(app: express) {
		app.post('/' + this.prefix + '/addGameDef', (req: express.Request, res: express.Response) => {
			if (req.query.gameName !== undefined) {
				if (req.query.scoringType !== undefined) {
					let scoreType: ScoringType = ScoringType[ScoringType[req.query.scoringTpye]];
					this.controller.addGameDef(req.query.gameName, scoreType)
						.then(response => {
							res.status(200).end();
						})
						.catch(err => {
							console.error('got an error from the game def controller while trying to add a new game def:\n' + err);
							res.status(500).send(err);
						});
				}
				else {
					console.log('no scoring type in call to add new game def');
					res.status(400).send('scoringType is a required parameter!');
				}
			}
			else {
				console.log('no gameName is call to add new game definition');
				res.status(400).send('gameName is a required parameter!');
			}
		});

		app.post('/' + this.prefix + '/allGameDefExpansion', (req: express.Request, res: express.Response) => {
			if (req.query.gameDefId !== undefined) {
				if (req.query.expansionName !== undefined) {
					this.controller.addExpansionToGame(req.query.gameDefId, req.query.expansionName)
						.then(response => {
							res.status(200).end();
						})
						.catch(err => {
							console.error('got an error attempting to add a game def expansion with name: ' + req.query.expansionName + ' to game def ' + req.query.gameDefId + '\n' + err);
							res.status(500).send(err);
						});
				}
				else {
					console.log('no expansionName was provided in call to add new expansion to game def');
					res.status(400).send('expansionName is a required parameter!');
				}
			}
			else {
				console.log('no gameDefId was provided in call to add new game def expansion');
				res.status(400).send('gameDefId is a required parameter!');
			}
		});


		app.get('/' + this.prefix + ' /allGameDefs', (req: express.Request, res: express.Response) => {
			this.controller.getAllGameDefs()
				.then(response => {
					res.status(200).send(response);
				})
				.catch(err => {
					console.error('got an error attempting to get all game defs: ' + err);
					res.stauts(500).send(err);
				});
		});
	}
}