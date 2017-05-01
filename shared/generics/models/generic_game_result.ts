export default class GameResult<T> {
	_id: string | number;
	gameDefId: string | number;
	date: Date;
	playerResults: T[];
	expansions: string[];
}