import http from 'http';
import { app } from './app';
import { config } from './config';
import { logger } from './utils/logger';
import { WebSocketServer } from './websocket/websocket.server';

const server = http.createServer(app);
const wsServer = new WebSocketServer(server);

wsServer.initialize();

server.listen(config.port, () => {
  logger.info(`KODI backend listening on port ${config.port}`);
});
