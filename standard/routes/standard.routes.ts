import express = require('express');

import {
	IStandardGameResultModel,
	IPlayerResultModel,
	GenericRoutes,

} from '../../shared/shared';

import StandardController from '../controllers/standard.controller';
export default class StandardRoutes extends GenericRoutes<StandardController, IStandardGameResultModel, IPlayerResultModel> {

	constructor(app) {
		super(app, new StandardController(), 'standard');
	}
}