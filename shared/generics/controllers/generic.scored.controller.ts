import GenericController from './generic.controller';

import {
	GameResult,
	ScoredPlayerResult
} from '../../../shared/shared';

export abstract class GenericScoredController<G extends GameResult<P>, P extends ScoredPlayerResult> extends GenericController<G, P> {

	/**
	*
	* Constructor to set the model
	* 
	**/
	constructor(_model: any) {
		super(_model);
	};

	public getScore(_gameId: string) : Promise<G> {
		return new Promise((resolve, reject) => {
			let query = { _id: _gameId };
			this.model.findOne(query, function(err, game) {
				if (err) {
					console.error('Got an error attempting to find a game with id: ' + _gameId + '\n' + err);
					reject(err);
				}
				else if (game) {
					resolve(game);
				}
				else {
					console.error('No game found for id: ' + _gameId);
					reject('No Game Found');
				}
			});
		});
	};

	public setScore(_gameId: string, _playerObj: P) : Promise<boolean> {
		return new Promise((resolve, reject) => {
			let query = {_id: _gameId};
			this.model.findOne(query, function(err, game) {
				if (err) {
					console.error('Got an error trying to find a game matching id: ' + _gameId + '\n' + err);
					reject(err);
				}
				else if (game) {
					//found a matching game
					let foundPlayer: boolean = false;
					for (let x: number = 0; x < game.playerResults.length; x++) {
						if (game.playerResults[x].playerId === _playerObj.playerId) {
							//found a matching player
							console.log('Found a matching player!');
							foundPlayer = true;
							game.playerResults[x].calculateScore(_playerObj);
							//now save the game
							game.save()
								.then(response => {
									resolve(true);
								}, err => {
									console.error('Got an error attempting to save the game after setting a players\' score\n' + err);
									reject(false);
								});
						}
					}

					if (!foundPlayer) {
						console.error('Player id: ' + _playerObj.playerId + '  was not found in game ' + _gameId);
						reject('Player id: ' + _playerObj.playerId + '  was not found in game ' + _gameId);
					}
				}
				else {
					console.error('No game found for id: ' + _gameId);
					reject('No game found for id: ' + _gameId);
				}
			});
		});
	}

	public saveGame(gameId: string, playerArray: P[]) : Promise<boolean> {
		let that = this;
		return new Promise((resolve, reject) => {
			let query = { _id: gameId };

			this.model.findOne(query, function(err, game) {
				if (err) {
					console.log('got an error attempting to find a game with id: ' + gameId + '\n' + err);

					reject(err);
				}
				else {
					if (game) {
						//need to match up the players
						for (let clientCounter: number = 0; clientCounter < playerArray.length; clientCounter++) {
							let playerFound: boolean = false;
							let serverResultCounter: number = -1;
							for (serverResultCounter = 0; serverResultCounter < game.playerResults.length; serverResultCounter++) {
								if (game.playerResults[serverResultCounter].playerId === playerArray[clientCounter].playerId) {
									playerFound = true;
									break;
								}
							}

							if (playerFound) {
								console.log('copying score!');
								//TODO: Error lies here!
								console.log(JSON.stringify(game.playerResults[serverResultCounter]));
								game.playerResults[serverResultCounter] = that.calculateScore(game.playerResults[serverResultCounter], playerArray[clientCounter]);
							}
							else {
								console.log('No player found for id: ' + playerArray[clientCounter].playerId);

								let newServerPlayer: P = {
									playerId: playerArray[clientCounter].playerId
								} as P;

								this.calculateScore(newServerPlayer, playerArray[clientCounter]);

								game.playerResults.push(newServerPlayer);
							}
						}

						game.save()
							.then(response => {
								console.log('Successfully saved the game!');
								resolve(true);
							}, err => {
								console.log('got an error attempting to save the game:\n' + err);
								resolve(false);
							});
					}
					else {
						console.log('no game found for gameId: ' + gameId);
						resolve(false);
					}
				}
			});
		});
	}
	abstract calculateScore(firstPlayer: P, secondPlayer: P) : P;
}

