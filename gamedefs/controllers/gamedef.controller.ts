import {
	GameDef,
	IGameDefModel,
	GameDefExpansion,
	IGameDefExpansionModel,
	ScoringType
} from '../../shared/shared';

export default class GameDefController {
	public addGameDef(_gameName: string, _scoringType: ScoringType): Promise<boolean> {
		return new Promise((resolve, reject) => {
			let newGameDef = new GameDef({
				name: _gameName,
				scoringType: _scoringType
			});

			newGameDef.save()
				.then(response => {
					console.log('Successfully added the game def: ' + _gameName);
					resolve(true);
				}, err => {
					console.error('failed to add game def: ' + _gameName + ' got the error\n' + err);
					reject(err);
				});
		});
	}

	public getAllGameDefs(): Promise<IGameDefModel[]> {
		return new Promise((resolve, reject) => { 
			GameDef.find({}, function(err, gameDefs) {
				if (err) {
					console.error('Got an error attempting to find all game defs\n' + err);
					reject(err);
				}
				else {
					resolve(gameDefs);
				}
			});
		});
	}

	public addExpansionToGame(_gameDefId: string, _expansionName: string) : Promise<boolean> {
		return new Promise((resolve, reject) => {
			let query = { _id: _gameDefId };
			GameDef.findOne(query, function(err, gameDef) {
				if (err) {
					console.error('Got an error attempting to find GameDef with ID: ' + _gameDefId + '\n' + err);
					reject(err);
				}
				else {
					if (gameDef) {
						//double check that the expansion hasn't already been added
						let found: boolean = false;
						for (let x: number = 0; x < gameDef.expansions.length; x++) {
							if (gameDef.expansions[x].name === _expansionName) {
								found = true;
								break;
							}
						}

						if (found) {
							console.error('Add expansion was called to add ' + _expansionName + ' to game ' + _gameDefId + ' but that expansion already exists on that game def');
							reject('expansion already added!');
						}
						else {
							let newGameDefExpansion = new GameDefExpansion({
								name: _expansionName
							});

							gameDef.expansions.push(newGameDefExpansion);

							gameDef.save()
								.then(result => {
									console.log('expansion ' + _expansionName + ' successfully added to: ' + _gameDefId);
									resolve(true);
								}, err => {
									console.error('got an error attempting to save the updated game def.  Got error:\n' + err);
									reject(err);
								});
						}
					}
				}
			});
		});
	}
}