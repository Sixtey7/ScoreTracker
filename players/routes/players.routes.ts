import express = require('express');

import { PlayerController } from '../players';

export default class PlayerRoutes {

	private prefix = 'players';
	private controller: PlayerController;
	constructor(app: express) {
		this.controller = new PlayerController();

		this.configureRoutes(app);

	}

	private configureRoutes(app: express) {
		app.get('/' + this.prefix + '/players', (req: express.Request, res: express.Response) => {
            console.log('returning all players!');
            if (req.query.playerIds !== undefined) {
                this.controller.getPlayers(req.query.playerIds)
                    .then(response => {
                        res.status(200).send(response);
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
            }
            else {
                res.status(400).send('playerIds is a required parameter!');
            }
        });

        app.get('/' + this.prefix + '/allPlayers', (req: express.Request, res: express.Response) => {
            this.controller.getAllPlayers()
                .then(response => {
                    res.status(200).send(response);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
	}
}