const Queue = require('bull');
const redis = require('redis');
const config = require('../config');

const parserQueue = new Queue('parser-queue', { redis: config });

module.exports = { parserQueue };