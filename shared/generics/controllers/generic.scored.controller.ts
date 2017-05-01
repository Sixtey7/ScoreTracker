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

}

