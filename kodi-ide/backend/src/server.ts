import express from 'express';
import http from 'http';
import { WebSocketServer } from './websocket/websocket.server';
import { config } from './config';
import { logger } from './utils/logger';

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocketServer(server);

wsServer.initialize();

server.listen(config.port, () => {
  logger.info(`KODI Backend running on port ${config.port}`);
});
