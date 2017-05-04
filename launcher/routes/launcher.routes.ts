import express = require('express');

import { LauncherController } from '../launcher';

export default class LauncherRoutes {
	private controller: LauncherController;
	private prefix: string = 'launcher';

	constructor(app: express) {
		this.controller = new LauncherController();

		this.configureRoutes(app);
	}

	private configureRoutes(app: express) {
		app.get('/' + this.prefix + '/summary', (req: express.Request, res: express.Response) => {
			this.controller.getAll()
				.then(response => {
					res.status(200).send(response);
				})
				.catch(err => {
					console.error('Got an error attempting to get all:\n' + err);
					res.status(500).send(err);
				});
		});
	}
}