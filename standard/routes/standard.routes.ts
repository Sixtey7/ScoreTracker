import express = require('express');

import {
	GenericRoutes,
} from '../../shared/shared';

import {
	IStandardGameResultModel,
	IStandardPlayerResultModel,
} from '../standard';

import StandardController from '../controllers/standard.controller';
export default class StandardRoutes extends GenericRoutes<StandardController, IStandardGameResultModel, IStandardPlayerResultModel> {

	constructor(app) {
		super(app, new StandardController(), 'standard');
	}
}