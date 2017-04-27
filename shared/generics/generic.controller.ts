import * as mongoose from 'mongoose';
import {
	Player,
	IPlayerModel,
	GameResult,
	IPlayerResultModel,
	PlayerResult
} from '../../shared/shared';

export default class GenericController<G extends GameResult<P>, P extends IPlayerResultModel> {

	private model: mongoose.Model<G>;
	/**
	*
	* Constructor to set the model
	* 
	**/
	constructor(_model: any) {
		this.model = _model;
	}
	/**
	*
	*  Returns the player objects matching the provided player ids
	*
	**/
	public getPlayers(playerIds: string[]) : Promise<IPlayerModel> {
		return new Promise((resolve, reject) => {
			let query = { _id: {$in: playerIds}};

			Player.find(query, function(err, players) {
				if (err) {
					console.error('Got an error attempting to find a list of players');
					reject(err);
				}
				else {
					resolve(players);
				}
			});
		});
	};

	/**
	*
	* Returns all of the players
	*
	**/
	public getAllPlayers() : Promise<IPlayerModel> {
		return new Promise((resolve, reject) => {
			Player.find({}, function(err, players) {
				if (err) {
					console.error('Got an error attempting to get all the players!');
					reject(err);
				}
				else {
					resolve(players);
				}
			});
		});
	};

	/**
	*
	* Returns All Of T
	*
	**/
	public getAll() : Promise<G[]> {
		return new Promise((resolve, reject) => {
			this.model.find({}, function(err, all) {
				if (err) { 
					console.error('Got an error attempting to get all!');
					reject(err);
				}
				else {
					resolve(all);
				}
			});
		});
	};

	public addPlayer(_gameId: string, _name: string): Promise<IPlayerModel> {
		let that = this;

		return new Promise((resolve, reject) => {
			//first, look to see if the player already exists

			let query = { name: _name };
			Player.findOne(query, function(err, player) {
				if (err) {
					console.error('got an error attempting to find a player!');
					reject(err);
				}

				if (player) {
					console.log('Player already exists');
					that.addPlayerToGame(_gameId, player)
						.then(success => {
							resolve(success);
						})

						.catch( err=> {
							console.error('Got an error attempting to add a player to a game\n' + err);
							reject(err)
						});
				}
				else {
					console.log('Player did not exist - creatng a new one!');
					let newPlayer = new Player({'name': _name});

					newPlayer.save()
						.then(response => {
							that.addPlayerToGame(_gameId, newPlayer)
								.then(success => {
									resolve(newPlayer);
								})
								.catch(err => {
									console.error('player creation was successful, but failed to add to game with error:\n' + err);
									reject('failed to add the new player to the game');
								})
						})
						.catch(err => {
							console.error('got an error saving the new player!\n' + err);
							reject(err);
						});
				}
			});
		});
	}

	private addPlayerToGame(_gameId: string, player: IPlayerModel): Promise<boolean> {
		return new Promise((resolve, reject) => {
			//find the game for the given id
			var query = { _id: _gameId};
			this.model.findOne(query, function(err, game) {
				if (err) {
					console.error('Got an error attempting to find a game with id: ' 
						+ _gameId + ' and add a player to it\n' + err);
					reject('failed to find a game matching the id provided');
				}
				else if (game) {
					for (let x: number = 0; x < game.playerResults.length; x++) {
						if (game.playerResults[x].playerId === player._id) {
							console.error('request to add player (' 
								+ player._id + ') to game (' + _gameId 
								+ ') but the player has already been added to the game!');
							reject('Player has already been added to game!');
						}
					}

					//if we're here - the player hasn't been added yet
					//first, create a new player result
					let newPlayerResult : P = ({
						playerId: player._id,
						score: 0
					} as P);

					game.playerResults.push(newPlayerResult);

					game.save()
						.then(response => {
							console.log('successfully saved the game!');
							resolve(true);
						}, err => {
							console.error('got an error attempting to save the game after adding the user!');
							reject('Failed to update game entry');
						});
				}
				else {
					console.error('game not found for error: ' + _gameId);
					reject('no game found with that id!');
				}
			});
		});
	};

}