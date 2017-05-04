import {
	GameResultSummary,
} from '../../shared/shared';

import {
	AgricolaController
} from '../../agricola/agricola';

import {
	StandardController
} from '../../standard/standard';

import parallel = require('async/parallel');


export default class LauncherController {
	private standardController: StandardController;
	private agricolaController: AgricolaController;

	constructor() {
		this.standardController = new StandardController();
		this.agricolaController = new AgricolaController();
	}

	public getAll(): Promise<GameResultSummary[]> {
		return new Promise<GameResultSummary[]>((resolve, reject) => {
			parallel({
				standard: (callback) => {
					this.standardController.getAllGamesSummary()
						.then(response => callback(null, response))
						.catch(err => callback(err, null));
				},
				agricola: (callback) => {
					this.agricolaController.getAllGamesSummary()
						.then(response => callback(null, response))
				}
			},
			function(err, results) {
				if (err) {
					console.error('Got an error attempting to get all games summaries in parallel:\n' + err);
					reject(err);
				}
				else {
					let returnVal: GameResultSummary[] = new Array<GameResultSummary>();

					returnVal = results['standard'].concat(results['agricola']);

					resolve(returnVal);
				}
			})
		})
	}
}