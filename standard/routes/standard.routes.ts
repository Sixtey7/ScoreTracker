import express = require('express');

import {
	IGameResultModel,
	GenericRoutes,

} from '../../shared/shared';

import StandardController from '../controllers/standard.controller';
export default class StandardRoutes extends GenericRoutes<StandardController, IGameResultModel> {

	constructor(app) {
		super(app, new StandardController(), 'standard');
	}
}