import express = require('express');

import {
	GenericRoutes,
} from '../../shared/shared';

import {
	IAgricolaGameResultModel,
	IAgricolaPlayerResultModel,
} from '../agricola';

import AgricolaController from '../controllers/agricola.controller';
export default class StandardRoutes extends GenericRoutes<AgricolaController, IAgricolaGameResultModel, IAgricolaPlayerResultModel> {

	constructor(app) {
		super(app, new AgricolaController(), 'agricola');
	}
}