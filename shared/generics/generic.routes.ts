import express = require('express');

import GenericController from './generic.controller';

export default class GenericRoutes<T extends GenericController<V>, V> {
	
	private controller: T;
	private prefix: string;

	constructor(app: express, _cont: T, _prefix: string) {
		this.controller = _cont;
		this.prefix = _prefix;
		this.configureRoutes(app);
	}

	private configureRoutes(app: express) {
		app.get('/' + this.prefix + '/hello', (req: express.Request, res: express.Response) => {
			res.status(200).send('Hello World!');
		});

		app.get('/' + this.prefix + '/getAll', (req: express.Request, res: express.Response) => {
			return this.controller.getAll()
				.then(response => {
					res.status(200).send(response);
				})
				.catch(err => {
					res.status(500).send(err);
				});
		});
	};
};