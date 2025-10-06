import * as process from 'process';

export const CONFIG_REPO = process.env.CONFIG_REPO;
export const CONTRIBUTIONS_REPO = process.env.CONTRIBUTIONS_REPO;
export const VALIDATOR_IDENTITY = process.env.VALIDATOR_IDENTITY ? process.env.VALIDATOR_IDENTITY.split(',').map((val) => val.trim()) : [];
export const API_URL = process.env.API_URL;