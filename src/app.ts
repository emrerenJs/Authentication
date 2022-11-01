import express from 'express';
import config from 'config';
import { connectToDb } from './utils/database';
import { log } from './utils/logger';
import router from './routes';

const app = express();
app.use(router);

const PORT = config.get('port') || 3000;

app.listen(PORT, () => {
    log.info(`App started at http://localhost:${PORT}`);
    connectToDb();
});