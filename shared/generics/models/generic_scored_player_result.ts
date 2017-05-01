import PlayerResult from './generic_player_result';
export interface ScoredPlayerResult extends PlayerResult {
	score: number;
	calculateScore(_other: ScoredPlayerResult); 
}