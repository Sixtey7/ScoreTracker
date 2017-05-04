import {
	Player,
	IPlayerModel
}
from '../../shared/shared';

export default class PlayerController{
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
}