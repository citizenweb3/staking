import * as process from 'process';

export const CONFIG_REPO = process.env.CONFIG_REPO;
export const CONTRIBUTIONS_REPO = process.env.CONTRIBUTIONS_REPO;
export const CATEGORIES = process.env.CATEGORIES ? process.env.CATEGORIES.split(',').map((cat) => cat.trim()) : [];