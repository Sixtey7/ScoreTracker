import express = require('express');

import {
	GenericScoredRoutes,
} from '../../shared/shared';

import {
	IStandardGameResultModel,
	IStandardPlayerResultModel,
} from '../standard';

import StandardController from '../controllers/standard.controller';
export default class StandardRoutes extends GenericScoredRoutes<StandardController, IStandardGameResultModel, IStandardPlayerResultModel> {

	constructor(app) {
		super(app, new StandardController(), 'standard');
	}
}