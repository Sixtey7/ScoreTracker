export default class GameResult<T> {
	private _id: string | number;
	private gameDefId: string | number;
	date: Date;
	playerResults: T[];
	expansions: string[];
}