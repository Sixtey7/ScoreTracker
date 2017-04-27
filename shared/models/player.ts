import * as mongoose from 'mongoose';

interface IPlayer {
	_id: string | number;
	name: string;
};

interface IPlayerModel extends IPlayer, mongoose.Document{}
var playerSchema = new mongoose.Schema({
	name: String
});

var Player = mongoose.model<IPlayerModel>("Player", playerSchema);

export {
	Player,
	IPlayerModel
};