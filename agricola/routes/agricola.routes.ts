import express = require('express');

import {
	GenericScoredRoutes,
} from '../../shared/shared';

import {
	IAgricolaGameResultModel,
	IAgricolaPlayerResultModel,
} from '../agricola';

import AgricolaController from '../controllers/agricola.controller';
export default class StandardRoutes extends GenericScoredRoutes<AgricolaController, IAgricolaGameResultModel, IAgricolaPlayerResultModel> {

	constructor(app) {
		super(app, new AgricolaController(), 'agricola');
	}
}