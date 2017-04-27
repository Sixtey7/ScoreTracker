import * as mongoose from 'mongoose';
import {
	Player,
	IPlayerModel
} from '../../shared/shared';

export default class GenericController<T> {

	private model: mongoose.Model;
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

	public getAll() : Promise<T[]> {
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


}